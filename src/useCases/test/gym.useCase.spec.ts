import { InMemoryGymRepository } from "@/repositories/in-memory/inMemory.gyms.repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GymUseCase } from "../gym.useCase";

let gymInMemoryRepository: InMemoryGymRepository;
let sut: GymUseCase;

describe("gym useCase", async () => {
  beforeEach(async () => {
    gymInMemoryRepository = new InMemoryGymRepository();
    sut = new GymUseCase(gymInMemoryRepository);
  });

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
