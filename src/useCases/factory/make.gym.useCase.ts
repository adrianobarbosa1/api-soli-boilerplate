import { PrismaGymRepository } from "@/repositories/prisma/prisma.gym.repository";
import { GymUseCase } from "../gym.useCase";

export function makeGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository();
  const gymUseCase = new GymUseCase(prismaGymRepository);
  return gymUseCase;
}
