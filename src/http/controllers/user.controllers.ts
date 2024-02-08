import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

async function userCreate(req: FastifyRequest, res: FastifyReply) {
  const { name, email, password } = userValidation.parse(req.body);

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

async function userMe(req: FastifyRequest, res: FastifyReply) {
  const userUseCase = makeUserUsercase();
  const { user } = await userUseCase.getUserProfile({
    userId: req.user.sub,
  });

  return res.status(201).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
}

export const userController = {
  userCreate,
  userMe,
};
