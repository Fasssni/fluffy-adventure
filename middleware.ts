import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkIfAuthorized } from "./services/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt");
  const protectedRoutes = ["/", "/dashboard"];
  if (!token) {
    if (!protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: "/((?!.*\\.).*)" };
