import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  const pathname = request.nextUrl.pathname;

  console.log("== Middleware Triggered ==");
  console.log("Path:", pathname);
  console.log("Auth token exists:", !!token);

  // Protect /Dashboard
  if (pathname.startsWith('/Dashboard')) {
    if (!token?.value) {
      console.log("No auth token. Redirecting to /LoginPage.");
      return NextResponse.redirect(new URL('/LoginPage', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Dashboard', '/Dashboard/:path*'], // Use capital D
};