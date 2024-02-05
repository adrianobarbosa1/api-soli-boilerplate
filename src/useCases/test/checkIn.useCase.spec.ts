import { BadRequestError } from "@/errors/bad-request-error";
import { CheckinInMemoryRepository } from "@/repositories/in-memory/checkIns.inMemory.repository";
import { GymInMemoryRepository } from "@/repositories/in-memory/gyms.inMemory.repository";
import { Decimal } from "@prisma/client/runtime/library";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "../checkin.useCase";

let checkInInMemoryRepository: CheckinInMemoryRepository;
let gymInMemoryRepository: GymInMemoryRepository;
let checkInUseCase: CheckInUseCase;

describe("checkin useCase", async () => {
  beforeEach(async () => {
    checkInInMemoryRepository = new CheckinInMemoryRepository();
    gymInMemoryRepository = new GymInMemoryRepository();
    checkInUseCase = new CheckInUseCase(
      checkInInMemoryRepository,
      gymInMemoryRepository
    );

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

  it("deve poder criar um chekin", async () => {
    const { checkIn } = await checkInUseCase.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("não deve poder fazer chekin duas vezes no mesmo dia", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInUseCase.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    await expect(() =>
      checkInUseCase.create({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });

  it("deve poder fazer o check-in duas vezes, mas em dias diferentes", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInUseCase.create({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await checkInUseCase.create({
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
      checkInUseCase.create({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(BadRequestError);
  });
});
