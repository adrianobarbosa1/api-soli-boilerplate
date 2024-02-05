import { NotFoundError } from "@/errors/not-found-error";
import { UsersRepository } from "@/repositories/users.repository";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private getUsersProfileRepository: UsersRepository) {}

  async getId({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.getUsersProfileRepository.findById(userId);
    if (!user) throw new NotFoundError();

    return {
      user,
    };
  }
}
