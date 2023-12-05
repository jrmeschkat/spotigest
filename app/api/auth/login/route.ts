import { NextResponse } from "next/server";
import { createCookieHeader } from "../cookie";

export async function POST(req: Request) {
  const { username } = await req.json();
  if (username) {
    const cookieHeaderResult = await createCookieHeader(username, false);

    if (cookieHeaderResult.isOk()) {
      return NextResponse.json(
        { success: true },
        { headers: { "Set-Cookie": cookieHeaderResult.value } }
      );
    } else {
      return NextResponse.json(cookieHeaderResult.error, { status: 500 });
    }
  } else {
    return NextResponse.json({ code: "username_missing" }, { status: 400 });
  }
}
