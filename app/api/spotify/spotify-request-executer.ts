import { Result, err, ok } from "neverthrow";

type SpotifyErrorCode =
  | "missing_spotify_client_id"
  | "missing_spotify_client_secret"
  | "error_fetching_spotify_data"
  | "error_fetching_spotify_token";

class SpotifyRequestExecuter {
  private _token: string | undefined;

  async fetchSpotify(
    url: string,
    init: RequestInit = {}
  ): Promise<Result<any, { code: SpotifyErrorCode }>> {
    if (!process.env.SPOTIFY_CLIENT_ID) {
      return err({ code: "missing_spotify_client_id" });
    }

    if (!process.env.SPOTIFY_CLIENT_SECRET) {
      return err({ code: "missing_spotify_client_secret" });
    }

    if (!this._token) {
      const tokenResult = await this.refetchToken();
      if (tokenResult.isOk()) {
        this._token = tokenResult.value;
      } else {
        return tokenResult;
      }
    }

    try {
      const res = await fetch(url, {
        ...init,
        headers: {
          ...(init.headers ?? {}),
          Authorization: `Bearer ${this._token}`,
        },
      });

      const data = await res.json();
      return ok(data);
    } catch (error) {
      return err({ code: "error_fetching_spotify_data" });
    }
  }

  private async refetchToken(): Promise<
    Result<string, { code: SpotifyErrorCode }>
  > {
    try {
      console.log("Refetch Spotify token...");
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
      });

      if (!res.ok) {
        return err({ code: "error_fetching_spotify_token" });
      }

      const tokenRes = await res.json();
      return ok(tokenRes.access_token);
    } catch (error) {
      return err({ code: "error_fetching_spotify_token" });
    }
  }
}

export const spotifyRequestExecuter = new SpotifyRequestExecuter();
