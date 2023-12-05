import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Result, err, ok } from "neverthrow";

let sdk: SpotifyApi;

type SpotifyErrorCode =
  | "missing_spotify_client_id"
  | "missing_spotify_client_secret";

export function getSpotifySDK(): Result<
  SpotifyApi,
  { code: SpotifyErrorCode }
> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  if (!SPOTIFY_CLIENT_ID) {
    return err({ code: "missing_spotify_client_id" });
  }

  if (!SPOTIFY_CLIENT_SECRET) {
    return err({ code: "missing_spotify_client_secret" });
  }

  if (!sdk) {
    sdk = SpotifyApi.withClientCredentials(
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET
    );
  }

  return ok(sdk);
}
