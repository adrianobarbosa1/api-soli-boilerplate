import { InMemoryGymRepository } from "@/repositories/in-memory/inMemory.gyms.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GymUseCase } from "../../useCases/gym.useCase";

let gymInMemoryRepository: InMemoryGymRepository;
let sut: GymUseCase;

describe("gym useCase", async () => {
  beforeEach(async () => {
    gymInMemoryRepository = new InMemoryGymRepository();
    sut = new GymUseCase(gymInMemoryRepository);
  });

  describe("gym create", async () => {
    it("deve poder criar uma gym-academia", async () => {
      const { gym } = await sut.create({
        title: "javascript Academia",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

      expect(gym.id).toEqual(expect.any(String));
    });
  });

  describe("gym getAllGyms", async () => {
    it("deveria ser capaz de procurar academias", async () => {
      await gymInMemoryRepository.create({
        title: "JavaScript Gym",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

      await gymInMemoryRepository.create({
        title: "TypeScript Gym",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

      const { gyms } = await sut.getAllGyms({
        query: "JavaScript",
        page: 1,
      });

      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([
        expect.objectContaining({ title: "JavaScript Gym" }),
      ]);
    });

    it("deve ser capaz de buscar pesquisa paginada de academia", async () => {
      for (let i = 1; i <= 22; i++) {
        await gymInMemoryRepository.create({
          title: `JavaScript Gym ${i}`,
          description: null,
          phone: null,
          latitude: -27.2092052,
          longitude: -49.6401091,
        });
      }

      const { gyms } = await sut.getAllGyms({
        query: "JavaScript",
        page: 2,
      });

      expect(gyms).toHaveLength(2);
      expect(gyms).toEqual([
        expect.objectContaining({ title: "JavaScript Gym 21" }),
        expect.objectContaining({ title: "JavaScript Gym 22" }),
      ]);
    });
  });

  describe("gym findNearbGyms", async () => {
    it("deve ser capaz de buscar academias próximas", async () => {
      await gymInMemoryRepository.create({
        title: "Near Gym",
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

      await gymInMemoryRepository.create({
        title: "Far Gym",
        description: null,
        phone: null,
        latitude: -27.0610928,
        longitude: -49.5229501,
      });

      const { gyms } = await sut.findNearbGyms({
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      expect(gyms).toHaveLength(1);
      expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
    });
  });
});
