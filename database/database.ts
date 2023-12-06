import { PrismaClient } from "@prisma/client";

let client: PrismaClient;

export function getClient() {
  if (!client) {
    client = new PrismaClient();
  }

  return client;
}
