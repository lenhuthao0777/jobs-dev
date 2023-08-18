import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  const response = NextResponse.next();

  if (token) {
    response.cookies.set('accessToken', token?.accessToken as string);
  }

  return response;
}

export default withAuth({
  pages: {
    signIn: '/signin',
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/'],
};
