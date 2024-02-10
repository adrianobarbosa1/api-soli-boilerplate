import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./config";
import { appRoutes } from "./http/routes";
import { InternalServerError } from "./useCases/errors/internal-server-error";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);
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

  throw new InternalServerError();
});
