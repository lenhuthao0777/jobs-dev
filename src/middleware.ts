import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


export async function middleware(req: NextRequest) {
  const token = await getToken({ req })

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
}

export default withAuth({
  pages: {
    signIn: '/signin',
  },
})

export const config = {
  matcher: ['/dashboard/:path*'],
}



