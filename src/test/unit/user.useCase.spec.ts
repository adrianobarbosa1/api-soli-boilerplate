import { InMemoryUsersRepository } from "@/repositories/in-memory/inMemory.users.repository";
import { BadRequestError } from "@/useCases/errors/bad-request-error";
import { NotFoundError } from "@/useCases/errors/not-found-error";
import { compare, hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { UserUseCase } from "../../useCases/user.useCase";

let usersInMemoryRepository: InMemoryUsersRepository;
let sut: UserUseCase;

describe("USER useCase", async () => {
  beforeEach(() => {
    usersInMemoryRepository = new InMemoryUsersRepository();
    sut = new UserUseCase(usersInMemoryRepository);
  });

  describe("Create user", async () => {
    it("deve poder criar um usuario", async () => {
      const createUser = {
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      };
      const { user } = await sut.create(createUser);

      expect(user.id).toEqual(expect.any(String));
    });

    //it should hash user password upon registration
    it("deve incriptografar a senha do usuário no momento do registro", async () => {
      const createUser = {
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      };
      const { user } = await sut.create(createUser);

      const passwordHash = await compare(
        createUser.password,
        user.passwordHash
      );

      expect(passwordHash).toBe(true);
    });

    //should mpt be able to register with same email twice
    it("deve não poder criar usuario com email duplicado", async () => {
      await sut.create({
        name: "John Doe",
        email: "johndoe5@exemple.com",
        password: "123456",
      });

      await expect(() =>
        sut.create({
          name: "John Doe",
          email: "johndoe5@exemple.com",
          password: "123456",
        })
      ).rejects.toBeInstanceOf(BadRequestError);
    });
  });

  describe("GetUserProfile user", async () => {
    it("deve poder pegar o perfil de um usuario pelo id", async () => {
      const createUser = await usersInMemoryRepository.create({
        name: "John Doe",
        email: "johndoe5@exemple.com",
        passwordHash: await hash("123456", 6),
      });

      const { user } = await sut.getUserProfile({
        userId: createUser.id,
      });

      expect(user.id).toEqual(expect.any(String));
      expect(user.name).toEqual("John Doe");
    });

    //it should hash user password upon registration
    it("deve gerar error notfound se o id não existir", async () => {
      await expect(() =>
        sut.getUserProfile({
          userId: "notExistId",
        })
      ).rejects.toBeInstanceOf(NotFoundError);
    });
  });
});
