import { UsersPrismaRepository } from "@/repositories/prisma/users.prisma.repository";
import { UserUseCase } from "../user.useCase";

export function makeUserUsercase() {
  const usersPrismaRepository = new UsersPrismaRepository();
  const userUseCase = new UserUseCase(usersPrismaRepository);
  return userUseCase;
}
