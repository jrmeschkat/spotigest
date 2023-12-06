import { SESSION_COOKIE } from "@/constants";
import { SpotigestError } from "@/utils/error";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { Result, err, ok } from "neverthrow";

const encoder = new TextEncoder();

export async function createCookieHeader(
  username: string,
  isAdmin = false,
  expires: string | number | Date = "1h"
): Promise<Result<string, SpotigestError>> {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    return err({ code: "config_error", msg: "missing_secret" });
  }

  const token = await new SignJWT({ username, isAdmin })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expires)
    .sign(encoder.encode(JWT_SECRET));

  const serialized = serialize(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return ok(serialized);
}
