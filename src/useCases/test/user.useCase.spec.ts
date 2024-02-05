import { BadRequestError } from "@/errors/bad-request-error";
import { UsersInMemoryRepository } from "@/repositories/in-memory/users.inMemory.repository";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserUseCase } from "../user.useCase";

let usersInMemoryRepository: UsersInMemoryRepository;
let userUseCase: UserUseCase;

describe("users useCase", async () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    userUseCase = new UserUseCase(usersInMemoryRepository);
  });

  it("deve poder criar um usuario", async () => {
    const createUser = {
      name: "John Doe",
      email: "johndoe5@exemple.com",
      password: "123456",
    };
    const { user } = await userUseCase.create(createUser);

    expect(user.id).toEqual(expect.any(String));
  });

  //it should hash user password upon registration
  it("deve incriptografar a senha do usuário no momento do registro", async () => {
    const createUser = {
      name: "John Doe",
      email: "johndoe5@exemple.com",
      password: "123456",
    };
    const { user } = await userUseCase.create(createUser);

    const passwordHash = await compare(createUser.password, user.passwordHash);

    expect(passwordHash).toBe(true);
  });

  //should mpt be able to register with same email twice
  it("deve não poder criar usuario com email duplicado", async () => {
    await userUseCase.create({
      name: "John Doe",
      email: "johndoe5@exemple.com",
      password: "123456",
    });

    await expect(() =>
      userUseCase.create({
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
