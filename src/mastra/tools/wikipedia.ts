import { createTool } from "@mastra/core";
import { z } from "zod";

export const wikipediaTool = createTool({
  id: "wikipedia-search",
  description:
    "Search Wikipedia for articles, facts, background information, and summaries on any topic.",
  inputSchema: z.object({
    query: z.string().describe("The search term or topic to look up on Wikipedia"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        title: z.string(),
        summary: z.string(),
        url: z.string(),
      })
    ),
  }),
  execute: async ({ context }) => {
    const { query } = context;

    try {
      // 1. Search Wikipedia for matching article titles
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        query
      )}&utf8=&format=json&origin=*`;

      const searchRes = await fetch(searchUrl, {
        headers: { "User-Agent": "MastraResearchDemo/1.0" },
      });

      if (!searchRes.ok) {
        return { results: [] };
      }

      const searchData = (await searchRes.json()) as {
        query?: { search?: Array<{ title: string; snippet: string }> };
      };

      const topHits = (searchData.query?.search || []).slice(0, 3);

      if (topHits.length === 0) {
        return { results: [] };
      }

      // 2. Fetch page summary extract for each top hit
      const results = await Promise.all(
        topHits.map(async (hit) => {
          try {
            const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              hit.title
            )}`;
            const sumRes = await fetch(summaryUrl, {
              headers: { "User-Agent": "MastraResearchDemo/1.0" },
            });

            if (sumRes.ok) {
              const sumData = (await sumRes.json()) as {
                title?: string;
                extract?: string;
                content_urls?: { desktop?: { page?: string } };
              };

              return {
                title: sumData.title || hit.title,
                summary: sumData.extract || hit.snippet.replace(/<[^>]*>/g, ""),
                url:
                  sumData.content_urls?.desktop?.page ||
                  `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title)}`,
              };
            }
          } catch {
            // Fallback to basic snippet
          }

          return {
            title: hit.title,
            summary: hit.snippet.replace(/<[^>]*>/g, ""),
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title)}`,
          };
        })
      );

      return { results };
    } catch (error) {
      console.error("Wikipedia search failed:", error);
      return { results: [] };
    }
  },
});

