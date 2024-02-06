import { GymRepository } from "@/repositories/gyms.repository";
import {
  GetAllGymsUseCaseRequest,
  GetAllGymsUseCaseResponse,
  GymCreateUseCaseRequest,
  GymCreateUseCaseResponse,
} from "./types.useCase";

export class GymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async create({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymCreateUseCaseRequest): Promise<GymCreateUseCaseResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }

  async getAllGyms({
    query,
    page,
  }: GetAllGymsUseCaseRequest): Promise<GetAllGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
