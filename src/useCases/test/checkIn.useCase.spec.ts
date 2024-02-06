import { BadRequestError } from "@/errors/bad-request-error";
import { InMemoryCheckinRepository } from "@/repositories/in-memory/inMemory.checkIns.repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/inMemory.gyms.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "../checkin.useCase";

let checkInInMemoryRepository: InMemoryCheckinRepository;
let gymInMemoryRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("checkin useCase", async () => {
  beforeEach(async () => {
    checkInInMemoryRepository = new InMemoryCheckinRepository();
    gymInMemoryRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInInMemoryRepository, gymInMemoryRepository);

    await gymInMemoryRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("create checkin", async () => {
    it("deve poder criar um chekin", async () => {
      const { checkIn } = await sut.create({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      expect(checkIn.id).toEqual(expect.any(String));
    });

    it("não deve poder fazer chekin duas vezes no mesmo dia", async () => {
      vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

      await sut.create({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      await expect(() =>
        sut.create({
          gymId: "gym-01",
          userId: "user-01",
          userLatitude: -27.2092052,
          userLongitude: -49.6401091,
        })
      ).rejects.toBeInstanceOf(BadRequestError);
    });

    it("deve poder fazer o check-in duas vezes, mas em dias diferentes", async () => {
      vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

      await sut.create({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

      const { checkIn } = await sut.create({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      });

      expect(checkIn.id).toEqual(expect.any(String));
    });

    it("não deveria ser possível fazer check-in em uma academia distante", async () => {
      gymInMemoryRepository.items.push({
        id: "gym-02",
        title: "JavaScript Gym",
        description: "",
        phone: "",
        latitude: new Decimal(-27.0747279),
        longitude: new Decimal(-49.4889672),
      });

      await expect(() =>
        sut.create({
          gymId: "gym-02",
          userId: "user-01",
          userLatitude: -27.2092052,
          userLongitude: -49.6401091,
        })
      ).rejects.toBeInstanceOf(BadRequestError);
    });
  });

  describe("getAll checkin", async () => {
    it("deve poder mostrar um historico de chekin do usuário", async () => {
      await checkInInMemoryRepository.create({
        gymId: "gym-01",
        userId: "user-01",
      });

      await checkInInMemoryRepository.create({
        gymId: "gym-02",
        userId: "user-01",
      });

      const { checkIns } = await sut.getAll({
        userId: "user-01",
        page: 1,
      });

      expect(checkIns).toHaveLength(2);
      expect(checkIns).toEqual([
        expect.objectContaining({ gymId: "gym-01" }),
        expect.objectContaining({ gymId: "gym-02" }),
      ]);
    });

    it("deve ser capaz de buscar o histórico de check-in paginado", async () => {
      for (let i = 1; i <= 22; i++) {
        await checkInInMemoryRepository.create({
          gymId: `gym-${i}`,
          userId: "user-01",
        });
      }

      const { checkIns } = await sut.getAll({
        userId: "user-01",
        page: 2,
      });

      expect(checkIns).toHaveLength(2);
      expect(checkIns).toEqual([
        expect.objectContaining({ gymId: "gym-21" }),
        expect.objectContaining({ gymId: "gym-22" }),
      ]);
    });
  });

  describe("getAllChekinsByUserId checkin", async () => {
    it("deve ser capaz de obter a contagem de check-ins a partir das métricas", async () => {
      await checkInInMemoryRepository.create({
        gymId: "gym-01",
        userId: "user-01",
      });

      await checkInInMemoryRepository.create({
        gymId: "gym-02",
        userId: "user-01",
      });

      const { checkInsCount } = await sut.getAllChekinsByUserId({
        userId: "user-01",
      });

      expect(checkInsCount).toEqual(2);
    });
  });
});
