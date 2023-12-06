import { User } from "@prisma/client";
import { getClient } from "./database";
import { Result, err, ok } from "neverthrow";
import { SpotigestError } from "@/utils/error";
import { hashPassword } from "@/utils/security";

export async function getUser(username: string): Promise<User | null> {
  return await getClient().user.findFirst({ where: { username: username } });
}

export async function createUser(
  username: string,
  password: string
): Promise<Result<User, SpotigestError>> {
  try {
    const user = await getClient().user.create({
      data: {
        username: username,
        password: await hashPassword(password),
      },
    });
    return ok(user);
  } catch (error) {
    return err({ code: "crud_error" });
  }
}
