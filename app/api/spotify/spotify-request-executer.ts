class SpotifyRequestExecuter {
  private _token: string | undefined;

  async fetchSpotify(url: string, init: RequestInit = {}) {
    if (!this._token) {
      this._token = await this.refetchToken();
    }

    return fetch(url, {
      ...init,
      headers: {
        ...(init.headers ?? {}),
        Authorization: `Bearer ${this._token}`,
      },
    });
  }

  private async refetchToken(): Promise<string> {
    console.log("Refetch Spotify token...");

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
    });

    const tokenRes = await res.json();

    return tokenRes.access_token;
  }
}

export const spotifyRequestExecuter = new SpotifyRequestExecuter();
