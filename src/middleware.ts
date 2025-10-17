import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/dashboard/login"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // If there is no token and it is not a public route, redirect a login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  // If there is a token and it is a public route, redirect to the dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};