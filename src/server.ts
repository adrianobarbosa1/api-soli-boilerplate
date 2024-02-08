import { app } from "./app";
import { prisma } from "./database/prismaClient";
import { env } from "./env";
import { startLoadingEffect, stopLoadingEffect } from "./utils/loadingEffect";

const start = async () => {
  let loadingInterval: NodeJS.Timeout | null = null;
  try {
    loadingInterval = startLoadingEffect();
    await prisma.$connect();
    stopLoadingEffect(loadingInterval);
    console.log("Connected to database ✅");

    await app
      .listen({
        host: "0.0.0.0",
        port: env.PORT,
      })
      .then(() => {
        console.log(`Listening on port  http://localhost:${env.PORT} ✅`);
      });
  } catch (err) {
    if (loadingInterval !== null) stopLoadingEffect(loadingInterval);
    console.error("Failed to connect to database ❌");
    console.error(err);
    process.exit(1);
  }
};

start();
