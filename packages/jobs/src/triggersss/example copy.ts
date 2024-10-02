import { logger, task, wait } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world-1",
  run: async (payload: unknown, { ctx }) => {
    logger.log("Hello, world!", { payload, ctx });

    await wait.for({ seconds: 1 });

    return {
      message: "Hello, world!",
    };
  },
});
