import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { App } from "./app";
import { headers } from "next/headers";
import { IUser } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotigest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50`}>
        <App user={getUser()}>{children}</App>
      </body>
    </html>
  );
}

const getUser = (): IUser | undefined => {
  const json = headers().get("x-current-user");
  return json ? JSON.parse(json) : undefined;
};
