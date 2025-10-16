import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/dashboard/login"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Si no hay token y no es ruta pública, redirigir a login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  // Si hay token y es ruta pública, redirigir a dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};