import { NextResponse } from "next/server";
import { createCookieHeader } from "../cookie";
import { InputError, InternalError } from "@/utils/error";
import { CredentialsSchema } from "@/utils/schema";
import { getUser } from "@/database/user";
import { verifyPassword } from "@/utils/security";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const credentials = CredentialsSchema.safeParse(body);

    if (!credentials.success) {
      return InputError("invalid_credentials");
    }

    const user = await getUser(credentials.data.username);

    if (!user) {
      return InputError("user_not_found");
    }

    const validPassword = await verifyPassword(
      credentials.data.password,
      user.password
    );

    if (!validPassword) {
      return InputError("invalid_password");
    }

    const cookieHeaderResult = await createCookieHeader(
      user.username,
      user.isAdmin
    );

    if (cookieHeaderResult.isOk()) {
      return NextResponse.json(
        { id: user.id, username: user.username, isAdmin: user.isAdmin },
        { headers: { "Set-Cookie": cookieHeaderResult.value } }
      );
    } else {
      return InternalError(cookieHeaderResult.error);
    }
  } catch (error) {
    return InternalError({ code: "unknown_error", additionalData: error });
  }
}
