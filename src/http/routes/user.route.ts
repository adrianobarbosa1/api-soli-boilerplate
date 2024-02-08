import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth-verify-jwt";

export async function userRoute(app: FastifyInstance) {
  app.post("/", userController.userCreate);
  app.get("/me", { onRequest: [auth] }, userController.userMe);
}
