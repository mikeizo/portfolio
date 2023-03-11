import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { requirePageAuth } from '@/util/token'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth')?.value
  const profile = await requirePageAuth(authCookie)

  if (!profile) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*'
}
