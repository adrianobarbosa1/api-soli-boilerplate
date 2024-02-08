import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { makeAuthUsercase } from "@/useCases/factory/make.auth.useCase";
import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authRegisterValid = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

async function authRegister(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = authRegisterValid.parse(req.body);

  try {
    const userUseCase = makeUserUsercase();
    await userUseCase.create({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof BadRequestError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(201).send();
}

const authLoginValid = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function authLogin(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = authLoginValid.parse(req.body);

  try {
    const authUseCase = makeAuthUsercase();
    const { user } = await authUseCase.login({
      email,
      password,
    });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return res.status(200).send({ token });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return res.status(err.statusCode).send({ message: err.message });
    }

    throw err;
  }
}

export const authController = {
  authRegister,
  authLogin,
};
