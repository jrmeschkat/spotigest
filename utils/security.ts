import { compare, hash } from "bcryptjs";

function passwordInput(password: string) {
  return `${password}$${process.env.PASSWORD_SECRET}$`;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(passwordInput(password), 10);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(passwordInput(password), hash);
}
