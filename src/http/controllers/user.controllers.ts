import { makeUserUsercase } from "@/useCases/factory/make.user.useCase";
import { FastifyReply, FastifyRequest } from "fastify";

async function userMe(req: FastifyRequest, res: FastifyReply) {
  const userUseCase = makeUserUsercase();
  const { user } = await userUseCase.getUserProfile({
    userId: req.user.sub,
  });

  return res.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  });
}

export const userController = {
  userMe,
};
