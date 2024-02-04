import { NotAuthorizedError } from "@/errors/not-authorized-error";
import { UsersPrismaRepository } from "@/repositories/prisma/users.prisma.repository";
import { AuthenticateUseCase } from "@/useCases/authenticate.useCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function authLogin(req: FastifyRequest, res: FastifyReply) {
  const { email, password } = authValidation.parse(req.body);

  try {
    const usersPrismaRepository = new UsersPrismaRepository();
    const authUseCase = new AuthenticateUseCase(usersPrismaRepository);
    await authUseCase.login({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  return res.status(200).send();
}

export const authController = {
  authLogin,
};
