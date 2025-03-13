import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(request) {
  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Get the session
  const isLoggedIn = !!request.auth

  if (!isLoggedIn && pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', url))
  }

  if (isLoggedIn) {
    if (pathname === '/auth/signin') {
      return NextResponse.redirect(new URL('/', url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/mindmaps/:path*', '/auth/signin'],
}
