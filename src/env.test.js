import { describe, test, expect } from "vitest";

describe("env spec", () => {
  test("it defines the dotenv variables on the test file", () => {
    expect(process.env.IS_TEST).toBe("true");
  });

  test("it does not define the dotenv variables on other files", () => {
    expect(process.env.SERVER_PORT).toBe(undefined);
  });
});
