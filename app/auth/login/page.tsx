"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.currentTarget.username.value,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/");
      }
    },
    [router]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <Input type="text" id="username" name="username" required />
        <Button type="submit">Submit</Button>
      </form>
      <a href="/">Home</a>
    </div>
  );
}