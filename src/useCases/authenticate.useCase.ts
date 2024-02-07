import { UsersRepository } from "@/repositories/users.repository";
import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private authRepository: UsersRepository) {}

  async login({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new NotAuthorizedError();

    const doesPassMatches = await compare(password, user.passwordHash);
    if (!doesPassMatches) throw new NotAuthorizedError();

    return {
      user,
    };
  }
}
