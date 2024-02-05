import { BadRequestError } from "@/errors/bad-request-error";
import { NotFoundError } from "@/errors/not-found-error";
import { CheckInRepository } from "@/repositories/checkins.repository";
import { GymRepository } from "@/repositories/gyms.repository";
import { CheckIn } from "@prisma/client";
import { getDistanceBetweenCoordinates } from "./utils/getDistanceBetweenCoordenates";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInRepository,
    private gymsRepository: GymRepository
  ) {}

  async create({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new NotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );
    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new BadRequestError("Deve está no raio da academia");
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new BadRequestError("Quantidade maxima de chekin atingido!");
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    });

    return {
      checkIn,
    };
  }
}
