import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { FastifyReply, FastifyRequest } from "fastify";

export async function auth(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    throw new NotAuthorizedError();
  }
}
