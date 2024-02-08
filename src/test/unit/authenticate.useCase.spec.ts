import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemory.users.repository";
import { NotAuthorizedError } from "@/useCases/errors/not-authorized-error";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "../../useCases/authenticate.useCase";

let usersInMemoryRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("authenticate useCase", async () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersInMemoryRepository);
  });

  it("deve poder se autenticar", async () => {
    await usersInMemoryRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@exemple.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await sut.login({
      email: "jhondoe@exemple.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("deve gerar error se email não existir", async () => {
    await expect(() =>
      sut.login({
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
      sut.login({
        email: "jhondoe@exemple.com",
        password: "senhaerrada",
      })
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });
});
