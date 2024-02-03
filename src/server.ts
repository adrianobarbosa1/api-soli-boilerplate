import { app } from "./app";
import { env } from "./env";

const start = async () => {
  try {
    await app
      .listen({
        host: "0.0.0.0",
        port: env.PORT,
      })
      .then(() => {
        console.log(`Server rodando na PORT ${env.PORT}`);
      });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
