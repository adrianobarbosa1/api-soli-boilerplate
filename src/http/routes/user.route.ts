import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controllers";
import { auth } from "../middlewares/auth-verify-jwt";

export async function userRoute(app: FastifyInstance) {
  //todas rotas abaixo de addHock precisa está autenticado
  app.addHook("onRequest", auth);
  app.get("/me", userController.userMe);
}
