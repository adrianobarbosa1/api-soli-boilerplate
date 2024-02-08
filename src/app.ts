import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    // throw new RequestValidationError(error.issues);
    return res.status(400).send({
      statusCode: 400,
      message: "Invalid request parameters",
      error: error.format(),
    });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  } else {
    // ferramenta de observalidade
  }

  return res.status(500).send({ message: "Internal server error." });
});
