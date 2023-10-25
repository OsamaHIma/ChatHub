import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    if (pathname === "/" || pathname === "/account" ) {
      return NextResponse.redirect(new URL("/auth/register", req.url));
    }
  }
  if (session) {
    if (pathname === "/auth/register" || pathname === "/auth/login" ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if(!session.user.isEmailConfirmed){
      signOut();
    }
  }
}
export const config = {
  matcher: [
    "/",
    "/account",
    "/auth/register",
    "/auth/login",
  ],
};
