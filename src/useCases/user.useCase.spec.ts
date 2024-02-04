import { UsersInMemoryRepository } from "@/repositories/in-memory/users.inMemory.repository";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { UserUseCase } from "./user.useCase";

describe("users useCase", async () => {
  // beforeAll(async () => {
  //   await app.ready();
  // });
  // afterAll(async () => {
  //   await app.close();
  // });

  it("deve poder criar um usuario", async () => {
    const usersInMemoryRepository = new UsersInMemoryRepository();
    const userUseCase = new UserUseCase(usersInMemoryRepository);

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
    const usersInMemoryRepository = new UsersInMemoryRepository();
    const userUseCase = new UserUseCase(usersInMemoryRepository);

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
    const usersInMemoryRepository = new UsersInMemoryRepository();
    const userUseCase = new UserUseCase(usersInMemoryRepository);

    const createUser = {
      name: "John Doe",
      email: "johndoe5@exemple.com",
      password: "123456",
    };
    await userUseCase.create(createUser);

    await expect(() => userUseCase.create(createUser)).rejects.toThrow(
      new Error("Email already exists")
    );
  });
});
