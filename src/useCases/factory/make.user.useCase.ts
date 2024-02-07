import { PrismaUsersRepository } from "@/repositories/prisma/prisma.users.repository";
import { UserUseCase } from "../user.useCase";

export function makeUserUsercase() {
  const usersPrismaRepository = new PrismaUsersRepository();
  const userUseCase = new UserUseCase(usersPrismaRepository);
  return userUseCase;
}
