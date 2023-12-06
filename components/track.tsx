import { FunctionComponent } from "react";
import { Track as SpotifyTrack } from "@spotify/web-api-ts-sdk";

interface TrackProps {
  track: SpotifyTrack;
}

export const Track: FunctionComponent<TrackProps> = ({ track }) => {
  return (
    <div className="flex">
      <img
        className="h-12 w-12 rounded-sm mx-2 self-center"
        src={
          track.album.images.reduce((smallest, current) =>
            !smallest || current.height < smallest.height ? current : smallest
          ).url
        }
      />
      <div className="flex flex-col">
        <div>{track.name}</div>
        <div className="text-xs">{track.album.name}</div>
        <div className="text-xs">{track.artists[0].name}</div>
      </div>
    </div>
  );
};
