import { NextRequest, NextResponse } from "next/server";
import { COOKIE } from "./constants";
import { jwtVerify } from "jose";

const encoder = new TextEncoder();

async function hasValidToken(req: NextRequest): Promise<boolean> {
  try {
    const token = req.cookies.get(COOKIE);
    if (token) {
      await jwtVerify(token.value, encoder.encode(process.env.SECRET ?? ""));
      return true;
    }
  } catch (err) {}

  return false;
}

function requiresAuthorization(req: NextRequest): boolean {
  return !req.nextUrl.pathname.match(/^\/(?:_next|auth)\//);
}

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    if (
      !req.nextUrl.pathname.startsWith("/api/auth/") &&
      !(await hasValidToken(req))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } else if (requiresAuthorization(req) && !(await hasValidToken(req))) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
