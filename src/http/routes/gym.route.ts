import { FastifyInstance } from "fastify";
import { gymController } from "../controllers/gym.controllers";
import { auth } from "../middlewares/auth-verify-jwt";

export async function gymRoute(app: FastifyInstance) {
  //todas rotas abaixo de addHock precisa está autenticado
  app.addHook("onRequest", auth);
  app.post("/register", gymController.gymRegister);
  app.get("/search", gymController.gymSearch);
  app.get("/nearby", gymController.gymNearby);
}
