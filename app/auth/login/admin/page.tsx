"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { makePOSTRequest } from "@/utils/fetch";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setError(undefined);
    e.preventDefault();
    const password = e.currentTarget.password.value;
    if (password) {
      const res = await makePOSTRequest("/api/auth/login/admin", { password });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const error = await res.json();
        if (error?.code === "invalid_password") {
          setError("Wrong password.");
        } else {
          throw new Error(error);
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="password">Password:</label>
        <Input type="password" id="password" name="password" required />
        <Button type="submit">Submit</Button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}
