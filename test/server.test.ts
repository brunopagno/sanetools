import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../src/server.js";

describe("endpoints", () => {
  describe("/", () => {
    test("should return a successful response", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    });

    test("should return a json with a healthy message", async () => {
      const response = await request(app).get("/");
      expect(response.body).toEqual({ status: "healthy" });
    });
  });
});
