import { debounce } from "lodash";
import React, { FunctionComponent } from "react";
import { Input } from "../input";
import { Search } from "lucide-react";

interface SearchbarInputProps {
  onFocus(): void;
  onInputChanged(value: string): void;
  debounce?: number;
}

export const SearchbarInput: FunctionComponent<SearchbarInputProps> = ({
  onFocus,
  onInputChanged,
  debounce: debounceValue = 1000,
}) => {
  const debouncedEvent = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChanged(e.target.value);
  }, debounceValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedEvent(e);
  };

  return (
    <div className="flex p-1 bg-slate-700 gap-1 items-center rounded-md">
      <Search className="border-r-2 pr-1 border-slate-500 text-slate-500" />
      <Input
        className="grow pl-1"
        type="text"
        id="searchbarInput"
        name="searchbarInput"
        onChange={handleChange}
        onFocus={onFocus}
      />
    </div>
  );
};
