import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("AUTH e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve poder criar usuário e autenticar", async () => {
    const registerResponse = await request(app.server)
      .post("/auth/register")
      .send({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      });

    const loginResponse = await request(app.server).post("/auth/login").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(registerResponse.statusCode).toEqual(201);
    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body).toEqual({
      token: expect.any(String),
    });
  });
});
