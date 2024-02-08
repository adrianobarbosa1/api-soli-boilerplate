import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controllers";

export async function authRoute(app: FastifyInstance) {
  app.post("/", authController.authLogin);
}
