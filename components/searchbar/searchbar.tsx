import React, { FunctionComponent } from "react";
import { SearchbarInput } from "./searchbar-input";

interface SearchbarProps {
  onInputChanged(value: string): void;
  onFocus(): void;
  debounce?: number;
  children?: React.ReactNode;
}

export const Searchbar: FunctionComponent<SearchbarProps> = ({
  onInputChanged,
  onFocus,
  debounce,
  children,
}) => {
  return (
    <div className="relative">
      <SearchbarInput
        onFocus={onFocus}
        onInputChanged={onInputChanged}
        debounce={debounce}
      />
      <div className="absolute w-full mt-2 flex flex-col bg-slate-700 rounded-md">
        {children}
      </div>
    </div>
  );
};
