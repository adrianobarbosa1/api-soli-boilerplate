import { BadRequestError } from "@/errors/bad-request-error";
import { NotFoundError } from "@/errors/not-found-error";
import { UsersRepository } from "@/repositories/users.repository";
import { hash } from "bcryptjs";
import {
  UserCreateUseCaseRequest,
  UserCreateUseCaseResponse,
  UserGetProfileUseCaseRequest,
  UserGetProfileUseCaseResponse,
} from "./types.useCase";

export class UserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async create({
    name,
    email,
    password,
  }: UserCreateUseCaseRequest): Promise<UserCreateUseCaseResponse> {
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

  async getUserProfile({
    userId,
  }: UserGetProfileUseCaseRequest): Promise<UserGetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundError();

    return {
      user,
    };
  }
}
