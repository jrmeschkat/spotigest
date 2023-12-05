import { SESSION_COOKIE } from "@/constants";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { Result, err, ok } from "neverthrow";

const encoder = new TextEncoder();

type LoginErrorCode = "missing_secret";

export async function createCookieHeader(
  username: string,
  isAdmin = false,
  expires: string | number | Date = "1h"
): Promise<Result<string, { code: LoginErrorCode }>> {
  const { SECRET } = process.env;

  if (!SECRET) {
    return err({ code: "missing_secret" });
  }

  const token = await new SignJWT({ username, isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires)
    .sign(encoder.encode(SECRET));

  const serialized = serialize(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return ok(serialized);
}
