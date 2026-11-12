import { NextRequest, NextResponse } from "next/server";
import { mastra } from "@/mastra";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Please provide a valid research topic or question." },
        { status: 400 }
      );
    }

    // Retrieve agent from Mastra instance
    const agent = mastra.getAgent("researchAgent");

    // Execute agent research
    const response = await agent.generate(
      `Please conduct research on the following topic: "${query.trim()}".`
    );

    return NextResponse.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error("Research agent error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An error occurred while generating the research report.",
      },
      { status: 500 }
    );
  }
}

