import { UsersPrismaRepository } from "@/repositories/prisma/users.prisma.repository";
import { AuthenticateUseCase } from "../authenticate.useCase";

export function makeAuthUsercase() {
  const usersPrismaRepository = new UsersPrismaRepository();
  const authUseCase = new AuthenticateUseCase(usersPrismaRepository);
  return authUseCase;
}
