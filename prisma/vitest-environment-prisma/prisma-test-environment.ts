import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  const url = new URL(env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    env.DATABASE_URL = databaseURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
