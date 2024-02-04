import { FastifyInstance } from "fastify";
import { createUser } from "../controllers/user.controllers";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
}
