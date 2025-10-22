import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  validateCredentials,
  isLockedOut,
  recordFailedAttempt,
  clearFailedAttempts,
  generateSessionToken,
  sanitizeInput,
  getClientIdentifier,
  securityHeaders,
} from '@/lib/auth'

/**
 * Enterprise-grade login endpoint with security best practices
 * - Rate limiting and account lockout
 * - Timing attack protection
 * - Secure session tokens with HMAC
 * - Input sanitization
 * - Security headers
 * - Audit logging
 */
export async function POST(request: NextRequest) {
  try {
    // Get client identifier for rate limiting
    const clientId = getClientIdentifier(request)

    // Check if client is locked out
    if (isLockedOut(clientId)) {
      console.warn(`Login attempt from locked out client: ${clientId}`)
      return NextResponse.json(
        { error: 'Trop de tentatives échouées. Veuillez réessayer dans 15 minutes.' },
        { 
          status: 429,
          headers: securityHeaders,
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { username, password } = body

    // Validate input presence
    if (!username || !password) {
      recordFailedAttempt(clientId)
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { 
          status: 400,
          headers: securityHeaders,
        }
      )
    }

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username)
    const sanitizedPassword = sanitizeInput(password)

    // Validate credentials with timing attack protection
    const isValid = validateCredentials(sanitizedUsername, sanitizedPassword)

    if (!isValid) {
      // Record failed attempt
      recordFailedAttempt(clientId)
      
      // Log security event
      console.warn(`Failed login attempt for user: ${sanitizedUsername} from ${clientId}`)
      
      // Generic error message to prevent user enumeration
      return NextResponse.json(
        { error: 'Nom d\'utilisateur ou mot de passe incorrect' },
        { 
          status: 401,
          headers: securityHeaders,
        }
      )
    }

    // Clear failed attempts on successful login
    clearFailedAttempts(clientId)

    // Generate secure session token
    const sessionToken = generateSessionToken(sanitizedUsername)
    
    // Set secure cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true, // Prevent XSS
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })

    // Log successful login (without sensitive data)
    console.info(`Successful login for user: ${sanitizedUsername} from ${clientId}`)

    return NextResponse.json(
      { success: true },
      { headers: securityHeaders }
    )

  } catch (error) {
    // Log error without exposing details
    console.error('Login endpoint error:', error instanceof Error ? error.message : 'Unknown error')
    
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { 
        status: 500,
        headers: securityHeaders,
      }
    )
  }
}
