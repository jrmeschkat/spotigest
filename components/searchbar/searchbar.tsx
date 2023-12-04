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
    <div>
      <SearchbarInput onInputChanged={onInputChanged} debounce={debounce} />
      <div className="mt-2 flex flex-col gap-1">{children}</div>
    </div>
  );
};
