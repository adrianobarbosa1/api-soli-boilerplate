import { FastifyInstance } from "fastify";
import { gymController } from "../controllers/gym.controllers";
import { auth } from "../middlewares/auth-verify-jwt";
import { authRoles } from "../middlewares/authRoles";

export async function gymRoute(app: FastifyInstance) {
  app.addHook("onRequest", auth);
  app.post(
    "/register",
    { onRequest: [authRoles(["manageUsers"])] },
    gymController.gymRegister
  );
  app.get("/search", gymController.gymSearch);
  app.get("/nearby", gymController.gymNearby);
}
