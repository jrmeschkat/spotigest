import { NextRequest, NextResponse } from "next/server";
import { getSpotifySDK } from "../getSpotifySDK";
import { PartialSearchResult } from "@spotify/web-api-ts-sdk";

export type SpotifySearchResult = Required<Pick<PartialSearchResult, "tracks">>;

export async function GET(req: NextRequest) {
  const query = new URL(req.url).searchParams.get("q");
  if (!query) {
    return NextResponse.json({ code: "missing_query" }, { status: 400 });
  }

  const sdk = getSpotifySDK();

  if (sdk.isErr()) {
    return NextResponse.json(sdk.error, { status: 500 });
  }

  const result: SpotifySearchResult = await sdk.value.search(
    query,
    ["track"],
    "DE"
  );

  return NextResponse.json(result);
}
