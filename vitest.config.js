import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "vitest.setup.js",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
