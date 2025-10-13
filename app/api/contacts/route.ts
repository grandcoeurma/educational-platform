import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { fullName, phone, conditionType, address, message } = body
    
    if (!fullName || !phone || !conditionType || !address || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      )
    }

    // Create contact in database
    const contact = await prisma.contact.create({
      data: {
        full_name: fullName,
        phone: phone,
        condition_type: conditionType,
        address: address,
        message: message,
      },
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre message a été envoyé avec succès!',
        id: contact.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve contacts (for admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const contacts = await prisma.contact.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        created_at: 'desc',
      },
    })

    const total = await prisma.contact.count()

    return NextResponse.json({
      contacts,
      total,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des contacts.' },
      { status: 500 }
    )
  }
}
