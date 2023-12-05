import { NextResponse } from "next/server";
import { createCookieHeader } from "../../cookie";

export async function POST(req: Request) {
  const { ADMIN_PASSWORD } = process.env;
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { code: "missing_admin_password" },
      { status: 500 }
    );
  }

  const { password } = await req.json();
  if (password === ADMIN_PASSWORD) {
    const cookieHeaderResult = await createCookieHeader(password, true);

    if (cookieHeaderResult.isOk()) {
      return NextResponse.json(
        { success: true },
        { headers: { "Set-Cookie": cookieHeaderResult.value } }
      );
    } else {
      return NextResponse.json(cookieHeaderResult.error, { status: 500 });
    }
  } else {
    return NextResponse.json({ code: "invalid_password" }, { status: 400 });
  }
}
