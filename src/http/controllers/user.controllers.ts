import { BadRequestError } from "@/errors/bad-request-error";
import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

async function createUser(req: FastifyRequest, res: FastifyReply) {
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

export const userController = {
  createUser,
};
