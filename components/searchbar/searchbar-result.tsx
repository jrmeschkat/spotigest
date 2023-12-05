import { FunctionComponent } from "react";

interface SearchbarResultProps {
  id: string;
  track: string;
  album: string;
  artist: string;
  img: string;
}

export const SearchbarResult: FunctionComponent<SearchbarResultProps> = ({
  track,
  album,
  artist,
  img,
  id,
}) => {
  const handleSelect = () => {
    console.log("Clicked", id);
  };

  return (
    <div
      className="py-1 flex cursor-pointer h-15 overflow-hidden"
      onClick={handleSelect}
    >
      <img className="h-12 w-12 rounded-sm mx-2 self-center" src={img} />
      <div className="flex flex-col">
        <div>{track}</div>
        <div className="text-xs">{album}</div>
        <div className="text-xs">{artist}</div>
      </div>
    </div>
  );
};
