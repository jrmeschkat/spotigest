import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "./constants";
import { jwtVerify } from "jose";
import { IUser } from "./app/context";
import { Result, err, ok } from "neverthrow";

const encoder = new TextEncoder();

async function hasValidToken(req: NextRequest): Promise<Result<IUser, any>> {
  try {
    const token = req.cookies.get(SESSION_COOKIE);
    if (token) {
      const jwt = await jwtVerify(
        token.value,
        encoder.encode(process.env.SECRET ?? "")
      );
      if (jwt.payload) {
        return ok(jwt.payload as unknown as IUser);
      }
    }
  } catch (err) {}

  return err(false);
}

function requiresAuthorization(req: NextRequest): boolean {
  return !req.nextUrl.pathname.match(/^\/(?:_next|auth)/);
}

function requiresAdmin(req: NextRequest): boolean {
  return !!req.nextUrl.pathname.match(/^\/admin/);
}

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    // is API call
    if (
      !req.nextUrl.pathname.startsWith("/api/auth/") &&
      (await hasValidToken(req)).isErr()
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } else if (requiresAuthorization(req)) {
    // is page request
    const tokenResult = await hasValidToken(req);

    if (requiresAdmin(req)) {
      if (tokenResult.isErr() || !tokenResult.value.isAdmin) {
        return NextResponse.redirect(new URL("/auth/login/admin", req.url));
      }
    }

    if (tokenResult.isErr()) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const response = NextResponse.next();
    response.headers.set("x-current-user", JSON.stringify(tokenResult.value));
    return response;
  }
}
