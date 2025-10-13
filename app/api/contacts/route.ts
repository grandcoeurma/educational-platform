import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifySessionToken, securityHeaders, sanitizeInput } from '@/lib/auth'

/**
 * Public endpoint to create contact submission
 * - Input validation and sanitization
 * - Rate limiting recommended (add middleware)
 * - Security headers
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { fullName, phone, conditionType, address, message } = body
    
    if (!fullName || !phone || !conditionType || !address || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { 
          status: 400,
          headers: securityHeaders,
        }
      )
    }

    // Sanitize all inputs to prevent injection attacks
    const sanitizedData = {
      full_name: sanitizeInput(fullName),
      phone: sanitizeInput(phone),
      condition_type: sanitizeInput(conditionType),
      address: sanitizeInput(address),
      message: message.trim().substring(0, 2000), // Limit message length
    }

    // Validate phone format (basic check)
    if (!/^[0-9\s\-+()]{8,20}$/.test(sanitizedData.phone)) {
      return NextResponse.json(
        { error: 'Format de numéro de téléphone invalide' },
        { 
          status: 400,
          headers: securityHeaders,
        }
      )
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: sanitizedData,
    })

    // Log contact creation (without sensitive data)
    console.info(`New contact submission: ID ${contact.id}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre message a été envoyé avec succès!',
        id: contact.id 
      },
      { 
        status: 201,
        headers: securityHeaders,
      }
    )
  } catch (error) {
    console.error('Error saving contact:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { 
        status: 500,
        headers: securityHeaders,
      }
    )
  }
}

/**
 * Protected endpoint to retrieve contacts (admin only)
 * - Validates session token with HMAC
 * - Implements pagination with limits
 * - Security headers
 * - SQL injection protection via Prisma
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication with secure token verification
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { error: 'Non autorisé. Veuillez vous connecter.' },
        { 
          status: 401,
          headers: securityHeaders,
        }
      )
    }

    // Verify token signature and expiration
    const verification = verifySessionToken(sessionCookie.value)
    
    if (!verification.valid) {
      // Clear invalid session
      cookieStore.delete('admin_session')
      
      return NextResponse.json(
        { error: 'Session invalide ou expirée. Veuillez vous reconnecter.' },
        { 
          status: 401,
          headers: securityHeaders,
        }
      )
    }

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 100) // Max 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0) // Min 0

    // Fetch contacts with pagination
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        take: limit,
        skip: offset,
        orderBy: {
          created_at: 'desc',
        },
        // Select only needed fields for security
        select: {
          id: true,
          full_name: true,
          phone: true,
          condition_type: true,
          address: true,
          message: true,
          created_at: true,
          updated_at: true,
        },
      }),
      prisma.contact.count(),
    ])

    // Log access (without sensitive data)
    console.info(`Admin accessed contacts: ${contacts.length} records, page ${Math.floor(offset / limit) + 1}`)

    return NextResponse.json(
      {
        contacts,
        total,
        limit,
        offset,
      },
      { headers: securityHeaders }
    )
  } catch (error) {
    console.error('Error fetching contacts:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des contacts.' },
      { 
        status: 500,
        headers: securityHeaders,
      }
    )
  }
}
