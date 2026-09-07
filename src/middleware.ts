import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const expectedToken = process.env.ADMIN_AUTH_TOKEN
    const authToken = request.cookies.get('admin_auth')?.value
    const isAdmin = Boolean(
      expectedToken &&
      expectedToken.trim().length > 0 &&
      authToken &&
      authToken === expectedToken
    )

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/about', request.url))
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: '/admin/:path*',
}
