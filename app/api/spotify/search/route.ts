import { NextRequest, NextResponse } from "next/server";
import { spotifyRequestExecuter } from "../spotify-request-executer";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("q");
  if (!query) {
    return NextResponse.json({ code: "missing_query" }, { status: 400 });
  }

  const res = await spotifyRequestExecuter.fetchSpotify(
    `https://api.spotify.com/v1/search?type=track&market=DE&q=${query}`
  );

  return NextResponse.json(await res.json());
}
