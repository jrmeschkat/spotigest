import { NextRequest, NextResponse } from "next/server";
import { spotifyRequestExecuter } from "../spotify-request-executer";

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("q");
  if (!query) {
    return NextResponse.json({ code: "missing_query" }, { status: 400 });
  }

  const result = await spotifyRequestExecuter.fetchSpotify(
    `https://api.spotify.com/v1/search?type=track&market=DE&q=${query}`
  );

  if (result.isOk()) {
    return NextResponse.json(result.value);
  }

  return NextResponse.json(result.error, {
    status: result.error.code === "error_fetching_spotify_data" ? 400 : 500,
  });
}
