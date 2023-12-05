import { NextResponse } from "next/server";
import { createCookieHeader } from "../cookie";

export async function POST() {
  const cookieHeaderResult = await createCookieHeader("", false, -1);

  if (cookieHeaderResult.isOk()) {
    return NextResponse.json(
      { success: true },
      { headers: { "Set-Cookie": cookieHeaderResult.value } }
    );
  }

  return NextResponse.json(cookieHeaderResult.error, { status: 500 });
}
