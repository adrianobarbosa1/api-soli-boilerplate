import { CustomError } from "@/useCases/errors/custom-error";
import { FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = (
  err: Error,
  req: FastifyRequest,
  res: FastifyReply
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res.status(500).send({ errors: [{ message: "Internal server error." }] });
};
