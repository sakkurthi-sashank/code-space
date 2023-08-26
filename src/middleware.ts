import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there is a user, return the response
  if (session?.user) {
    return res
  }

  // If there is no user, redirect to signin
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/auth/signin'
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/', '/courses/:path*', '/admin/:path*'],
}
