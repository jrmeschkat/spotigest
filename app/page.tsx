"use client";

import { Searchbar } from "@/components/searchbar/searchbar";
import { SearchbarResult } from "@/components/searchbar/searchbar-result";
import { useCallback, useState } from "react";
import { SpotifySearchResult } from "./api/spotify/search/route";
import { Track } from "@/components/track";
import { Track as SpotifyTrack } from "@spotify/web-api-ts-sdk";
import { Button } from "@/components/button";
import { makePOSTRequest } from "@/utils/fetch";

export default function Home() {
  const [results, setResults] = useState<SpotifySearchResult | undefined>(
    undefined
  );
  const [selected, setSelected] = useState<SpotifyTrack | undefined>();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");

  const search = async (value: string) => {
    setQuery(value);
    if (value) {
      try {
        const res = await fetch(
          `/api/spotify/search?q=${encodeURIComponent(value)}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setOpen(true);
        } else {
          const err = await res.json();
          console.error("Error:", err.code);
        }
      } catch (error) {}
    }
  };

  const handleSelection = (t: SpotifyTrack) => {
    setSelected(t);
    setOpen(false);
  };

  const handleFocus = useCallback(() => {
    if (query && results) {
      setOpen(true);
    }
  }, [query, results]);

  const handleSuggest = async () => {
    await makePOSTRequest("/api/spotigest/suggest", selected);
  };

  return (
    <div className="flex flex-col mx-10">
      <h1>Home</h1>
      <Searchbar onInputChanged={search} onFocus={handleFocus}>
        {open &&
          results &&
          results.tracks.items.map((t) => (
            <SearchbarResult onClick={() => handleSelection(t)}>
              <Track track={t} />
            </SearchbarResult>
          ))}
      </Searchbar>
      {selected && <Track track={selected} />}
      <Button onClick={handleSuggest} disabled={!selected}>
        OK
      </Button>
    </div>
  );
}
