import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: "proj_raxmqnsxepndhqkztsnt",
  runtime: "node",
  logLevel: "log",
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/index.ts"],
});
