import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('admin_auth')?.value
    const isAdmin = authToken === process.env.ADMIN_AUTH_TOKEN

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/about', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
