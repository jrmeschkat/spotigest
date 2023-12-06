import { NextResponse } from "next/server";

type SpotigestErrorCode =
  | "crud_error"
  | "config_error"
  | "input_error"
  | "unknown_error";

export interface SpotigestError {
  code: SpotigestErrorCode;
  msg?: string;
  additionalData?: any;
}

export const InputError = (msg: string) =>
  NextResponse.json({ code: "input_error", msg } as SpotigestError, {
    status: 400,
  });

export const InternalError = (error: SpotigestError) =>
  NextResponse.json(error, { status: 500 });
