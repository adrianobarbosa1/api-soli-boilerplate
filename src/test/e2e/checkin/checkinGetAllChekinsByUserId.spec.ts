import { app } from "@/app";
import { prisma } from "@/database/prismaClient";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("checkin get all chekins by userId e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve ser capaz de obter a contagem total de check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gymId: gym.id,
          userId: user.id,
        },
        {
          gymId: gym.id,
          userId: user.id,
        },
      ],
    });

    const response = await request(app.server)
      .get("/checkins/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toEqual(2);
  });
});
