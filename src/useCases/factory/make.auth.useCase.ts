import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { AuthenticateUseCase } from "../authenticate.useCase";

export function makeAuthUsercase() {
  const usersPrismaRepository = new PrismaUsersRepository();
  const authUseCase = new AuthenticateUseCase(usersPrismaRepository);
  return authUseCase;
}
