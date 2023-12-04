import { debounce } from "lodash";
import React, { FunctionComponent } from "react";
import { Input } from "../input";

interface SearchbarInputProps {
  onInputChanged(value: string): void;
  debounce?: number;
}

export const SearchbarInput: FunctionComponent<SearchbarInputProps> = ({
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
    <div>
      <Input
        className="bg-slate-800"
        type="text"
        id="searchbarInput"
        name="searchbarInput"
        onChange={handleChange}
      />
    </div>
  );
};
