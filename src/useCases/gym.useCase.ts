import { GymRepository } from "@/repositories/gyms.repository";
import {
  FindNearbGymsUseCaseRequest,
  FindNearbGymsUseCaseResponse,
  GetAllGymsUseCaseRequest,
  GetAllGymsUseCaseResponse,
  GymCreateUseCaseRequest,
  GymCreateUseCaseResponse,
} from "./gym.types";

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

  async findNearbGyms({
    userLatitude,
    userLongitude,
  }: FindNearbGymsUseCaseRequest): Promise<FindNearbGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
