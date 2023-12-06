"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { makePOSTRequest } from "@/utils/fetch";
import { upperFirst } from "lodash";
import { useRouter } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const FormValueSchema = z
  .object({
    value: z.string().min(5),
  })
  .transform(({ value }) => value);

const FormEventCredentialsSchema = z
  .object({
    currentTarget: z.object({
      username: FormValueSchema,
      password: FormValueSchema,
      password_repeat: z
        .object({
          value: z.string(),
        })
        .transform(({ value }) => value)
        .optional(),
    }),
  })
  .transform(({ currentTarget }) => ({
    username: currentTarget.username,
    password: currentTarget.password,
    passwordRepeat: currentTarget.password_repeat,
  }));

const toErrorMsg = (code: string) => {
  const parts = code.split("_");
  parts[0] = upperFirst(parts[0]);
  const last = `${parts.pop()}.`;
  parts.push(last);
  return parts.join(" ");
};

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | undefined>();
  const [registerError, setRegisterError] = useState<string | undefined>();

  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoginError(undefined);
      const credentials = FormEventCredentialsSchema.safeParse(e);

      if (credentials.success) {
        const res = await makePOSTRequest("/api/auth/login", {
          username: credentials.data.username,
          password: credentials.data.password,
        });

        const data = await res.json();

        if (res.ok) {
          router.push("/");
          router.refresh();
        } else {
          if (data.code === "input_error") {
            setLoginError(toErrorMsg(data.msg));
          }
        }
      }
    },
    [router]
  );

  const handleRegister = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setRegisterError(undefined);
      const credentials = FormEventCredentialsSchema.safeParse(e);

      if (credentials.success) {
        if (credentials.data.password !== credentials.data.passwordRepeat) {
          setRegisterError("Passwords not identical.");
        } else {
          const res = await makePOSTRequest("/api/auth/register", {
            username: credentials.data.username,
            password: credentials.data.password,
          });

          const data = await res.json();
          if (res.ok) {
            router.push("/");
            router.refresh();
          } else {
            if (data.code === "input_error") {
              setRegisterError(toErrorMsg(data.msg));
            }
          }
        }
      } else {
        const { details } = fromZodError(credentials.error);
        const error = `${upperFirst(details[0].path[1].toString())}: ${
          details[0].message
        }`;
        setRegisterError(error);
      }
    },
    [router]
  );

  return (
    <div className="flex gap-2 justify-center">
      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-2 gap-y-2">
          <span className="col-span-2 text-xl">Login:</span>
          <label htmlFor="username_login">Username:</label>
          <Input type="text" id="username_login" name="username" required />
          <label htmlFor="password_login">Password:</label>
          <Input type="password" id="password_login" name="password" required />
          <span className="col-span-2 text-center">
            <Button className="px-5" type="submit">
              Login
            </Button>
          </span>
          {loginError && (
            <span className="col-span-2 text-red-400">{loginError}</span>
          )}
        </div>
      </form>

      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-y-2">
          <span className="col-span-2 text-xl">Register:</span>
          <label htmlFor="username_register">Username:</label>
          <Input type="text" id="username_register" name="username" required />
          <label htmlFor="password_register">Password:</label>
          <Input
            type="password"
            id="password_register"
            name="password"
            required
          />
          <label htmlFor="password_repeat_register">Repeat password:</label>
          <Input
            type="password"
            id="password_repeat_register"
            name="password_repeat"
            required
          />
          <span className="col-span-2 text-center">
            <Button className="px-5" type="submit">
              Register
            </Button>
          </span>
          {registerError && (
            <span className="col-span-2 text-red-400">{registerError}</span>
          )}
        </div>
      </form>
    </div>
  );
}
