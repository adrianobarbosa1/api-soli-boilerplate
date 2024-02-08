import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

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
  userMe,
};
