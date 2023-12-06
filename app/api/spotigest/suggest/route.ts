import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const track = await req.json()

  return NextResponse.json({ success: true });
}
