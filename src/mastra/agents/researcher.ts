import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Agent } from "@mastra/core";
import { wikipediaTool } from "../tools/wikipedia";

const apiKey =
  process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

const google = createGoogleGenerativeAI({
  apiKey,
});

const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

export const researchAgent = new Agent({
  name: "Wikipedia Research Agent",
  instructions: `You are an expert research assistant.
When given a topic or query:
1. Use the wikipedia-search tool to search for relevant articles and extract facts, context, and data.
2. If necessary, you can make multiple searches on related concepts.
3. Synthesize the findings into a clear, structured, and informative research briefing.
4. Structure your response with markdown:
   - ## Executive Summary
   - ## Key Details & Context
   - ## In-Depth Analysis
   - ## Sources & Further Reading (include the Wikipedia URLs returned by the tool)
Maintain an objective, analytical tone and ensure key points are highlighted with bullet points.`,
  model: google(modelName),
  tools: {
    wikipediaTool,
  },
});

