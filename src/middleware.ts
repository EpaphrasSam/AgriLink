import { auth } from "@/utils/auth/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  const protectedRoutes = {
    farmer: "/farmer-portal",
    consumer: ["/my-chats", "/my-orders"],
  };

  const postLoginRestrictedRoutes = ["/login", "/signup"];

  if (!session) {
    if (protectedRoutes.consumer.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    const { role } = session.user;

    if (role === "FARMER" && !pathname.startsWith("/farmer-portal")) {
      return NextResponse.redirect(new URL("/farmer-portal", req.url));
    }

    if (role === "CONSUMER" && pathname.startsWith("/farmer-portal")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (postLoginRestrictedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
