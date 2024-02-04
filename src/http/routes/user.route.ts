import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controllers";

export async function userRoute(app: FastifyInstance) {
  app.post("/", userController.createUser);
}
