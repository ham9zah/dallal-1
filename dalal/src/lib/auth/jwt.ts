import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

const JWT_SECRET = 'your-secret-key' // يجب تغييره في الإنتاج
const TOKEN_NAME = 'auth_token'

export interface JWTPayload {
  userId: string
  email?: string
  phone?: string
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyJWT(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
}

export function removeAuthCookie() {
  cookies().delete(TOKEN_NAME)
}

export function getAuthToken(req?: NextRequest): string | null {
  if (req) {
    // للطلبات API
    return req.cookies.get(TOKEN_NAME)?.value || null
  }
  // للطلبات العادية
  return cookies().get(TOKEN_NAME)?.value || null
}

export async function getCurrentUser(req?: NextRequest) {
  try {
    const token = getAuthToken(req)
    if (!token) return null

    const payload = verifyJWT(token)
    // TODO: جلب معلومات المستخدم من قاعدة البيانات
    return {
      id: payload.userId,
      email: payload.email
    }
  } catch {
    return null
  }
}
