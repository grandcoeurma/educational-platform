import crypto from 'crypto'

/**
 * Authentication utility functions
 * Implements enterprise-grade security practices
 */

// Constants for security
const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production'
const SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours in milliseconds
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

// In-memory store for failed attempts (use Redis in production)
const failedAttempts = new Map<string, { count: number; lockoutUntil?: number }>()

/**
 * Secure comparison to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  
  return crypto.timingSafeEqual(
    Buffer.from(a, 'utf8'),
    Buffer.from(b, 'utf8')
  )
}

/**
 * Validate admin credentials with timing attack protection
 */
export function validateCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.USER_ADMIN
  const adminPassword = process.env.USER_ADMIN_PASSWORD

  // Check if credentials are configured
  if (!adminUsername || !adminPassword) {
    console.error('Security Error: Admin credentials not configured in environment')
    return false
  }

  // Check for empty inputs
  if (!username || !password) {
    return false
  }

  // Constant-time comparison to prevent timing attacks
  const usernameMatch = secureCompare(username, adminUsername)
  const passwordMatch = secureCompare(password, adminPassword)

  return usernameMatch && passwordMatch
}

/**
 * Check if IP is locked out due to failed attempts
 */
export function isLockedOut(identifier: string): boolean {
  const attempt = failedAttempts.get(identifier)
  
  if (!attempt) {
    return false
  }

  if (attempt.lockoutUntil && Date.now() < attempt.lockoutUntil) {
    return true
  }

  // Clear expired lockout
  if (attempt.lockoutUntil && Date.now() >= attempt.lockoutUntil) {
    failedAttempts.delete(identifier)
    return false
  }

  return false
}

/**
 * Record failed login attempt
 */
export function recordFailedAttempt(identifier: string): void {
  const attempt = failedAttempts.get(identifier) || { count: 0 }
  
  attempt.count += 1

  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    attempt.lockoutUntil = Date.now() + LOCKOUT_DURATION
    console.warn(`Security Alert: Account locked for ${identifier} due to ${MAX_LOGIN_ATTEMPTS} failed attempts`)
  }

  failedAttempts.set(identifier, attempt)
}

/**
 * Clear failed attempts on successful login
 */
export function clearFailedAttempts(identifier: string): void {
  failedAttempts.delete(identifier)
}

/**
 * Generate secure session token
 */
export function generateSessionToken(username: string): string {
  const timestamp = Date.now()
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const payload = `${username}:${timestamp}:${randomBytes}`
  
  // Create HMAC signature
  const hmac = crypto.createHmac('sha256', SESSION_SECRET)
  hmac.update(payload)
  const signature = hmac.digest('hex')
  
  // Combine payload and signature
  const token = Buffer.from(`${payload}:${signature}`).toString('base64')
  
  return token
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string): { valid: boolean; username?: string } {
  try {
    // Decode token
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const parts = decoded.split(':')
    
    if (parts.length !== 4) {
      return { valid: false }
    }

    const [username, timestamp, randomBytes, signature] = parts
    
    // Reconstruct payload
    const payload = `${username}:${timestamp}:${randomBytes}`
    
    // Verify signature
    const hmac = crypto.createHmac('sha256', SESSION_SECRET)
    hmac.update(payload)
    const expectedSignature = hmac.digest('hex')
    
    if (!secureCompare(signature, expectedSignature)) {
      console.warn('Security Alert: Invalid session signature detected')
      return { valid: false }
    }

    // Check expiration
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    if (tokenAge > SESSION_DURATION) {
      return { valid: false }
    }

    return { valid: true, username }
  } catch (error) {
    console.error('Session verification error:', error)
    return { valid: false }
  }
}

/**
 * Sanitize input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 100) // Limit length
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  
  return ip
}

/**
 * Security headers for responses
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}
