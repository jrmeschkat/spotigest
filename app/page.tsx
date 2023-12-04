"use client";

import { Searchbar } from "@/components/searchbar/searchbar";
import { SearchbarResult } from "@/components/searchbar/searchbar-result";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);

  const search = async (value: string) => {
    if (value) {
      const res = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(value)}`
      );
      const data = await res.json();
      setResults(data.tracks.items);
    }
  };

  return (
    <main className="flex flex-col mx-10">
      <h1>Home</h1>
      <Searchbar onInputChanged={search}>
        {results.map((r) => (
          <SearchbarResult
            key={r.id}
            id={r.id}
            track={r.name}
            artist={r.artists[0].name}
            album={r.album.name}
            img={r.album.images[2].url}
          />
        ))}
      </Searchbar>
    </main>
  );
}

const temp = {
  album: {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/0cbL6CYnRqpAxf1evwUVQD",
        },
        href: "https://api.spotify.com/v1/artists/0cbL6CYnRqpAxf1evwUVQD",
        id: "0cbL6CYnRqpAxf1evwUVQD",
        name: "Die Ärzte",
        type: "artist",
        uri: "spotify:artist:0cbL6CYnRqpAxf1evwUVQD",
      },
    ],
    external_urls: {
      spotify: "https://open.spotify.com/album/4MSgkcrwZGz7zeTIpNFy3Z",
    },
    href: "https://api.spotify.com/v1/albums/4MSgkcrwZGz7zeTIpNFy3Z",
    id: "4MSgkcrwZGz7zeTIpNFy3Z",
    images: [
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b273b31ca7bbd75637f5a590c310",
        width: 640,
      },
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e02b31ca7bbd75637f5a590c310",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d00004851b31ca7bbd75637f5a590c310",
        width: 64,
      },
    ],
    is_playable: true,
    name: "Das Ist Nicht Die Ganze Wahrheit...",
    release_date: "1988-04-19",
    release_date_precision: "day",
    total_tracks: 14,
    type: "album",
    uri: "spotify:album:4MSgkcrwZGz7zeTIpNFy3Z",
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/0cbL6CYnRqpAxf1evwUVQD",
      },
      href: "https://api.spotify.com/v1/artists/0cbL6CYnRqpAxf1evwUVQD",
      id: "0cbL6CYnRqpAxf1evwUVQD",
      name: "Die Ärzte",
      type: "artist",
      uri: "spotify:artist:0cbL6CYnRqpAxf1evwUVQD",
    },
  ],
  disc_number: 1,
  duration_ms: 221173,
  explicit: false,
  external_ids: { isrc: "DEE868800049" },
  external_urls: {
    spotify: "https://open.spotify.com/track/5aWpvFnByyWodgqYlC9kha",
  },
  href: "https://api.spotify.com/v1/tracks/5aWpvFnByyWodgqYlC9kha",
  id: "5aWpvFnByyWodgqYlC9kha",
  is_local: false,
  is_playable: true,
  name: "Westerland",
  popularity: 63,
  preview_url:
    "https://p.scdn.co/mp3-preview/fe09eca3401b552bb7e1909860edff8dab9b376e?cid=3fbab134227c405f9fc850957599773a",
  track_number: 5,
  type: "track",
  uri: "spotify:track:5aWpvFnByyWodgqYlC9kha",
};
