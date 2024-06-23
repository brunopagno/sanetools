import { describe, test, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("database example test", () => {
  afterAll(async () => {
    await prisma.config.deleteMany();
  });

  test("create record", async () => {
    const name = "version";
    const value = "v0.1.0";
    const record = await prisma.config.create({
      data: {
        name,
        value,
      },
    });

    expect(record.name).toBe(name);
    expect(record.value).toBe(value);
  });
});
