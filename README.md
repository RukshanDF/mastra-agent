# ⚡ Mastra AI Research Agent

<p align="center">
  <img src="https://img.shields.io/badge/Mastra-v0.2-cyan?style=for-the-badge&logo=probot" alt="Mastra" />
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Google-Gemini_Flash-purple?style=for-the-badge&logo=google" alt="Gemini" />
  <img src="https://img.shields.io/badge/Tailwind-CSS_v3-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

An autonomous, full-stack **AI Research Agent** built with **[Mastra](https://mastra.ai)**, **Google Gemini**, and **React 19 / Next.js 15**.

The agent receives any research directive, autonomously plans and executes queries against Wikipedia's public API using a type-safe Mastra tool, reads live articles, and synthesizes a verified, structured intelligence dossier wrapped inside a futuristic **Unreal Engine 5 digital HUD interface**.

---

## 🌟 Key Features

* **🤖 Autonomous Research Agent:** Configured with system instructions to formulate multi-step searches, read extracts, and compile structured briefings.
* **🔍 Zero-Cost Wikipedia Tool:** Custom tool built with Mastra's `createTool` and Zod validation. Queries Wikipedia's open REST API with **zero API keys and zero paid subscriptions**.
* **🎮 Unreal Engine Digital HUD UI:** Cybernetic terminal interface featuring translucent glassmorphic HUD cards, glowing blueprint grids, telemetry status ribbons, and animated probe visualizers.
* **📄 Markdown Intelligence Dossiers:** Rich report rendering with Executive Summary, Key Details, In-Depth Analysis, and clickable source citations.
* **⚡ Pre-configured Gemini Patch:** Includes an automated `postinstall` patch ensuring full compatibility with Google's modern Gemini models (handling `thought_signature` requirements seamlessly).

---

## 📂 Project Architecture

```
mastra-agent/
├── .env.example                   # Environment variable template
├── scripts/
│   └── patch-google-sdk.js        # Automatic Gemini thoughtSignature compatibility patch
├── src/
│   ├── mastra/
│   │   ├── tools/
│   │   │   └── wikipedia.ts       # Mastra tool for Wikipedia search & summaries (Zod-typed)
│   │   ├── agents/
│   │   │   └── researcher.ts      # Mastra Agent definition (Gemini model + instructions + tools)
│   │   └── index.ts               # Central Mastra instance & registry
│   └── app/
│       ├── api/
│       │   └── research/
│       │       └── route.ts       # Next.js Route Handler executing agent.generate()
│       ├── layout.tsx             # Root layout with digital grid styling
│       ├── globals.css            # Sci-Fi / Unreal Engine theme styles & keyframe glows
│       └── page.tsx               # Interactive React 19 HUD UI
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/RukshanDF/mastra-agent.git
cd mastra-agent
```

### 2. Install Dependencies
```bash
npm install
```
*(The automated postinstall script will configure Google SDK compatibility)*

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Add your **Google Gemini API Key** in `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
```
> 🔑 You can get a free API key at [Google AI Studio](https://aistudio.google.com/apikey).

### 4. Run the Development Server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the app!

---

## 🛠️ How It Works

### 1. Defining the Mastra Tool (`src/mastra/tools/wikipedia.ts`)
Using Mastra's `createTool`, we define an autonomous search capability with Zod input/output schemas:

```typescript
import { createTool } from "@mastra/core";
import { z } from "zod";

export const wikipediaTool = createTool({
  id: "wikipedia-search",
  description: "Search Wikipedia for articles, facts, and summaries on any topic.",
  inputSchema: z.object({
    query: z.string().describe("Search term or topic"),
  }),
  outputSchema: z.object({
    results: z.array(z.object({ title: z.string(), summary: z.string(), url: z.string() })),
  }),
  execute: async ({ context }) => {
    // 1. Search Wikipedia API
    // 2. Fetch page summary extract & desktop URL
    // 3. Return structured data to the model
  },
});
```

### 2. Creating the Research Agent (`src/mastra/agents/researcher.ts`)
We bind the model (`gemini-3.5-flash-lite` via `@ai-sdk/google`), system persona, and custom tools into a Mastra `Agent`:

```typescript
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Agent } from "@mastra/core";
import { wikipediaTool } from "../tools/wikipedia";

export const researchAgent = new Agent({
  name: "Wikipedia Research Agent",
  instructions: `You are an expert research assistant.
1. Use wikipedia-search to gather facts, context, and data.
2. Synthesize findings into Executive Summary, Key Details, In-Depth Analysis, and Sources.
3. Maintain an objective, analytical tone and include source links.`,
  model: google("gemini-3.5-flash-lite"),
  tools: { wikipediaTool },
});
```

### 3. Executing via Next.js API Route (`src/app/api/research/route.ts`)
The server route fetches the agent from the Mastra instance and invokes `.generate()`:

```typescript
import { mastra } from "@/mastra";

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  const agent = mastra.getAgent("researchAgent");
  const response = await agent.generate(`Please conduct research on: "${query}"`);
  return NextResponse.json({ text: response.text });
}
```

---

## 🔧 Pro-Tip: Gemini Thought Signatures

With modern Gemini models (Gemini 2.5/3.x+), Google enforces **Thought Signatures** on multi-turn tool calling. When frameworks invoke tools without re-broadcasting internal thought signatures, Google returns:
```
Function call is missing a thought_signature in functionCall parts.
```
This repository solves this via an automated patch (`scripts/patch-google-sdk.js`) that injects Google's official bypass sentinel (`skip_thought_signature_validator`), ensuring 100% reliable tool calling.

---

## 📜 License

MIT License. Free to use, adapt, and build upon.
