import React, { FunctionComponent } from "react";
import { SearchbarInput } from "./searchbar-input";

interface SearchbarProps {
  onInputChanged(value: string): void;
  debounce?: number;
  children?: React.ReactNode;
}

export const Searchbar: FunctionComponent<SearchbarProps> = ({
  onInputChanged,
  debounce,
  children,
}) => {
  return (
    <div className="relative">
      <SearchbarInput onInputChanged={onInputChanged} debounce={debounce} />
      <div className="absolute w-full mt-2 flex flex-col bg-slate-700 rounded-md">{children}</div>
    </div>
  );
};
