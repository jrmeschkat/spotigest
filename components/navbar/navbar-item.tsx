import { UserContext } from "@/app/context";
import { FunctionComponent, ReactNode, useContext } from "react";

interface NavbarItemProps {
  href: string;
  onClick?(): void;
  children: ReactNode;
  requireLoggedIn?: boolean;
}

export const NavbarItem: FunctionComponent<NavbarItemProps> = ({
  href,
  onClick,
  children,
  requireLoggedIn = false,
}) => {
  const user = useContext(UserContext);

  return !requireLoggedIn || user ? (
    <a
      className="px-2 hover:bg-slate-700 grow flex items-center cursor-pointer border-r-2 border-slate-800"
      {...{
        ...(onClick ? { onClick } : { href }),
      }}
    >
      {children}
    </a>
  ) : (
    <></>
  );
};
