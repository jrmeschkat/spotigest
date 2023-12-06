import { createUser, getUser } from "@/database/user";
import { InputError, InternalError } from "@/utils/error";
import { CredentialsSchema } from "@/utils/schema";
import { NextRequest, NextResponse } from "next/server";
import { createCookieHeader } from "../cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const credentials = CredentialsSchema.safeParse(body);
    if (!credentials.success) {
      return InputError("invalid_credentials");
    }
    const user = await getUser(credentials.data.username);
    if (user) {
      return InputError("username_already_used");
    }

    const newUserResult = await createUser(
      credentials.data.username,
      credentials.data.password
    );

    if (newUserResult.isErr()) {
      return InternalError(newUserResult.error);
    }

    const { value: newUser } = newUserResult;

    const cookieHeaderResult = await createCookieHeader(
      newUser.username,
      newUser.isAdmin
    );
    if (cookieHeaderResult.isOk()) {
      return NextResponse.json(
        {
          id: newUser.id,
          username: newUser.username,
          isAdmin: newUser.isAdmin,
        },
        { headers: { "Set-Cookie": cookieHeaderResult.value } }
      );
    } else {
      return InternalError(cookieHeaderResult.error);
    }
  } catch (error) {
    return InternalError({ code: "unknown_error", additionalData: error });
  }
}
