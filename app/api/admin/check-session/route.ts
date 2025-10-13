import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken, securityHeaders } from '@/lib/auth'

/**
 * Secure session verification endpoint
 * - Validates session token with HMAC
 * - Checks token expiration
 * - Returns security headers
 */
export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { authenticated: false },
        { headers: securityHeaders }
      )
    }

    // Verify token signature and expiration
    const verification = verifySessionToken(sessionCookie.value)
    
    if (!verification.valid) {
      // Invalid or expired token - clear cookie
      cookieStore.delete('admin_session')
      
      return NextResponse.json(
        { authenticated: false },
        { headers: securityHeaders }
      )
    }

    return NextResponse.json(
      { 
        authenticated: true,
        username: verification.username,
      },
      { headers: securityHeaders }
    )

  } catch (error) {
    console.error('Session check error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { authenticated: false },
      { headers: securityHeaders }
    )
  }
}
