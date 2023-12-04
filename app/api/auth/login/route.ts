import { COOKIE } from "@/constants";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const usernames: string[] = [];

const encoder = new TextEncoder();

export async function POST(req: Request) {
  const { username } = await req.json();
  if (username) {
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.SECRET ?? ""));

    const serialized = serialize(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      { success: true },
      { headers: { "Set-Cookie": serialized } }
    );
  } else {
    return NextResponse.json(
      { success: false, msg: "username missing" },
      { status: 400 }
    );
  }
}
