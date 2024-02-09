import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("auth register e2e", async () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve poder criar um usuário", async () => {
    const response = await request(app.server).post("/auth/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
