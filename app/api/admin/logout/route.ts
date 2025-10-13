import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { securityHeaders } from '@/lib/auth'

/**
 * Secure logout endpoint
 * - Clears session cookie
 * - Returns security headers
 * - Logs logout event
 */
export async function POST() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    
    // Log logout event (without sensitive data)
    if (session) {
      console.info('Admin logout')
    }
    
    // Delete session cookie
    cookieStore.delete('admin_session')
    
    return NextResponse.json(
      { success: true },
      { headers: securityHeaders }
    )
  } catch (error) {
    console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Erreur de déconnexion' },
      { 
        status: 500,
        headers: securityHeaders,
      }
    )
  }
}
