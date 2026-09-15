import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || process.env.ADMIN_AUTH_TOKEN || "fallback-dev-secret-change-in-production"
)

async function getUserFromRequest(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET, { algorithms: ['HS256'] })
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes: require login + admin role
  if (pathname.startsWith('/admin')) {
    const user = await getUserFromRequest(request)
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Submit review/question pages: require login
  if (pathname === '/submit-review' || pathname === '/submit-question') {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Review/question submission APIs: require login
  if ((pathname === '/api/reviews' || pathname === '/api/questions/submit') && request.method === 'POST') {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/submit-review', '/submit-question', '/api/reviews', '/api/questions/submit'],
}
