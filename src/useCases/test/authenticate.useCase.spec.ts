import { NotAuthorizedError } from "@/errors/not-authorized-error";
import { UsersInMemoryRepository } from "@/repositories/in-memory/users.inMemory.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../authenticate.useCase";

let usersInMemoryRepository: UsersInMemoryRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("authenticate useCase", async () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    authenticateUseCase = new AuthenticateUseCase(usersInMemoryRepository);
  });

  it("deve poder se autenticar", async () => {
    await usersInMemoryRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await authenticateUseCase.login({
      email: "jhondoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("deve gerar error se email não existir", async () => {
    await expect(() =>
      authenticateUseCase.login({
        email: "emailerrado@exemple.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });

  it("deve gerar error se senha estiver errada", async () => {
    await usersInMemoryRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(() =>
      authenticateUseCase.login({
        email: "jhondoe@exemple.com",
        password: "senhaerrada",
      })
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });
});
