import { NotFoundError } from "@/errors/not-found-error";
import { UsersInMemoryRepository } from "@/repositories/in-memory/users.inMemory.repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "../getUserProfile.useCase";

let usersInMemoryRepository: UsersInMemoryRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe("get user profile useCase", async () => {
  beforeEach(() => {
    usersInMemoryRepository = new UsersInMemoryRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersInMemoryRepository);
  });

  it("deve poder pegar o perfil de um usuario pelo id", async () => {
    const createUser = await usersInMemoryRepository.create({
      name: "John Doe",
      email: "johndoe5@exemple.com",
      passwordHash: await hash("123456", 6),
    });

    const { user } = await getUserProfileUseCase.getId({
      userId: createUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  //it should hash user password upon registration
  it("deve gerar error notfound se o id não existir", async () => {
    await expect(() =>
      getUserProfileUseCase.getId({
        userId: "notExistId",
      })
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});
