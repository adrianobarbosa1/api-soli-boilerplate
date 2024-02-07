import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controllers";

export async function authRoute(app: FastifyInstance) {
  app.post("/", authController.authLogin);
  app.get("/", authController.authLogin);
  app.put("/", authController.authLogin);
  app.delete("/", authController.authLogin);
}
