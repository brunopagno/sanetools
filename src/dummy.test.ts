import { describe, test, expect, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("dummy database does things", () => {
  afterAll(async () => {
    await prisma.dummy.deleteMany();
  });

  test("create record", async () => {
    const name = "dummy record";
    const dummy = await prisma.dummy.create({
      data: {
        name,
      },
    });

    expect(dummy.name).toBe(name);
  });
});
