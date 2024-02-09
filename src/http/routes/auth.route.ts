import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controllers";

export async function authRoute(app: FastifyInstance) {
  app.post("/register", authController.authRegister);
  app.post("/login", authController.authLogin);
  app.post("/token/refresh", authController.refreshToken);
}
