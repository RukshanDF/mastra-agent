import { Mastra } from "@mastra/core";
import { researchAgent } from "./agents/researcher";

export const mastra = new Mastra({
  agents: {
    researchAgent,
  },
});

