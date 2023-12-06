import { SpotigestError } from "@/utils/error";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Result, err, ok } from "neverthrow";

let sdk: SpotifyApi;

export function getSpotifySDK(): Result<SpotifyApi, SpotigestError> {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  if (!SPOTIFY_CLIENT_ID) {
    return err({ code: "config_error", msg: "missing_spotify_client_id" });
  }

  if (!SPOTIFY_CLIENT_SECRET) {
    return err({ code: "config_error", msg: "missing_spotify_client_secret" });
  }

  if (!sdk) {
    sdk = SpotifyApi.withClientCredentials(
      SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET
    );
  }

  return ok(sdk);
}
