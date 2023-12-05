import React, { ComponentProps, FunctionComponent, ReactElement } from "react";
import { NavbarItem } from "./navbar-item";

interface NavbarProps {
  children?:
    | ReactElement<ComponentProps<typeof NavbarItem>>
    | ReactElement<ComponentProps<typeof NavbarItem>>[];
}

export const Navbar: FunctionComponent<NavbarProps> = ({ children }) => {
  return (
    <nav className="h-full flex border-l-2 border-slate-800">{children}</nav>
  );
};
