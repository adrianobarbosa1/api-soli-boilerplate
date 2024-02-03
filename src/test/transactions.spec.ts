import supertest from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";

describe("/transactions", async () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a new transaction", async () => {
    const res = await supertest(app.server).post("/transactions").send({
      title: "titulo",
      amount: 1000,
      type: "credit",
    });

    expect(res.statusCode).toEqual(201);
  });

  it("should be able to LIST a new transaction", async () => {
    const res = await supertest(app.server).post("/transactions").send({
      title: "titulo",
      amount: 1000,
      type: "credit",
    });

    const coockies = res.get("Set-Cookie");

    const resList = await supertest(app.server)
      .get("/transactions")
      .set("Cookie", coockies)
      .expect(200);

    expect(resList.body.transaction).toEqual([
      expect.objectContaining({
        title: "titulo",
        amount: 1000,
      }),
    ]);
  });
});
