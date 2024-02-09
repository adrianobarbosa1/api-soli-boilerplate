import { FastifyInstance } from "fastify";
import { checkinController } from "../controllers/checkin.controllers";
import { auth } from "../middlewares/auth-verify-jwt";

export async function checkinRoute(app: FastifyInstance) {
  app.addHook("onRequest", auth);
  app.post("/:gymId/checkins", checkinController.checkinRegister);
  app.get("/history", checkinController.checkinGetAll);
  app.get("/metrics", checkinController.checkinGetAllChekinsByUserId);
  app.patch("/:checkInId/validate", checkinController.checkinValidate);
}
