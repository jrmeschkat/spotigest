import { FunctionComponent, ReactNode } from "react";

interface SearchbarResultProps {
  children?: ReactNode;
  onClick(): void;
}

export const SearchbarResult: FunctionComponent<SearchbarResultProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className="h-15 py-1  cursor-pointer hover:bg-slate-600 border-b-2 border-slate-500"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
