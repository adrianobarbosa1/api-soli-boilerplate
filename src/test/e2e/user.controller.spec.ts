import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("USER e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve poder buscar usuário pelo token", async () => {
    await request(app.server).post("/auth/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const loginResponse = await request(app.server).post("/auth/login").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = loginResponse.body;

    const response = await request(app.server)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(201);
  });
});
