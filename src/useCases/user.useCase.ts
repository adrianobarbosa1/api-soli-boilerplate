import { BadRequestError } from "@/errors/bad-request-error";
import { UsersRepository } from "@/repositories/users.repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface UserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface UserUseCaseResponse {
  user: User;
}

export class UserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async create({
    name,
    email,
    password,
  }: UserUseCaseRequest): Promise<UserUseCaseResponse> {
    const passwordHash = await hash(password, 6);
    const existUserWithSameEmail = await this.usersRepository.findByEmail(
      email
    );
    if (existUserWithSameEmail)
      throw new BadRequestError("Email already exists");
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return {
      user,
    };
  }
}
