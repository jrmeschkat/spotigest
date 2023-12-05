"use client";

import React, { FunctionComponent } from "react";
import { IUser, UserContext } from "./context";
import { Navbar } from "@/components/navbar/navbar";
import { NavbarItem } from "@/components/navbar/navbar-item";
import { makePOSTRequest } from "@/utils/fetch";
import { useRouter } from "next/navigation";

interface AppProps {
  user: IUser | undefined;
  children: React.ReactNode;
}

export const App: FunctionComponent<AppProps> = ({ children, user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await makePOSTRequest("/api/auth/logout", null);
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <UserContext.Provider value={user}>
      <header className="flex items-center justify-between bg-slate-900 fixed top-0 w-full h-14 flex">
        <div></div>
        <Navbar>
          <NavbarItem href="/">Home</NavbarItem>
          <NavbarItem href="/admin">Admin</NavbarItem>
          <NavbarItem href="" onClick={handleLogout} requireLoggedIn={true}>
            Logout
          </NavbarItem>
        </Navbar>
      </header>
      <main className="pt-14">{children}</main>
    </UserContext.Provider>
  );
};
