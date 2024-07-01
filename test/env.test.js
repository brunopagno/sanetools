import { describe, test, expect } from "vitest";

describe("env spec", () => {
  test("it defines the dotenv variables on the test file", () => {
    expect(process.env.IS_TEST).toBe("true");
  });
});
