import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("gym search e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve poder buscar uma gym pelo title", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia title",
        description: "description",
        phone: "669-9999-9999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    await request(app.server)
      .post("/gyms/register")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "segunda academia",
        description: "description",
        phone: "669-9999-9999",
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "Academia title",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia title",
      }),
    ]);
  });
});
