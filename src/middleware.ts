import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;

  switch (true) {
    case pathname === "/":
      const dashboardCookie = cookieStore.get("dashboard-cookie");
      if (!dashboardCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return NextResponse.next();

    default:
      return NextResponse.next();
  }
}
