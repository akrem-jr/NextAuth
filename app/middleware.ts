import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token; // Safely access token

    console.log(pathname);
    console.log(token?.role); // Safely log token role

    // Check if user tries to access "/CreateUser" and is not an admin
    if (pathname.startsWith("/CreateUser") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/Denied", req.url)); // Use redirect for clearer access denial
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Check if the token exists
    },
  }
);

export const config = { matcher: ["/CreateUser"] };
