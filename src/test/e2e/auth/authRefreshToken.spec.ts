import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("auth refresh token e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve ser capaz de atualizar um token", async () => {
    await request(app.server).post("/auth/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const loginResponse = await request(app.server).post("/auth/login").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const cookies = loginResponse.get("Set-Cookie");

    const response = await request(app.server)
      .post("/auth/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
