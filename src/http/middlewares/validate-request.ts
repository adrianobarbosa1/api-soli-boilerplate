import { env } from "@/config";
import { RequestValidationError } from "@/useCases/errors/request-validation-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: FastifyRequest, res: FastifyReply) => {
    try {
      schema.parse(req.body);
      schema.parse(req.params);
      schema.parse(req.query);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RequestValidationError(error.errors);
      } else {
        if (env.NODE_ENV === "production") {
          console.error(error);
        } else {
          // ferramenta de observalidade
        }
        return res.status(500);
      }
    }
  };
