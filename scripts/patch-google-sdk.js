const fs = require("fs");
const path = require("path");

const filesToPatch = [
  path.join(__dirname, "..", "node_modules", "@ai-sdk", "google", "dist", "index.js"),
  path.join(__dirname, "..", "node_modules", "@ai-sdk", "google", "dist", "index.mjs"),
  path.join(__dirname, "..", "node_modules", "@ai-sdk", "google", "internal", "dist", "index.js"),
  path.join(__dirname, "..", "node_modules", "@ai-sdk", "google", "internal", "dist", "index.mjs"),
];

const targetPattern = /case "tool-call":\s*\{\s*return \{\s*functionCall: \{\s*name: part\.toolName,\s*args: part\.args\s*\}\s*(\,\s*thoughtSignature:\s*"skip_thought_signature_validator")?\s*\}\s*;\s*\}/g;

const replacement = `case "tool-call": {
                return {
                  functionCall: {
                    name: part.toolName,
                    args: part.args
                  },
                  thoughtSignature: "skip_thought_signature_validator",
                  thought_signature: "skip_thought_signature_validator"
                };
              }`;

for (const file of filesToPatch) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    if (content.includes("thought_signature: \"skip_thought_signature_validator\"")) {
      console.log(`[patch] Already patched: ${path.relative(process.cwd(), file)}`);
      continue;
    }
    if (targetPattern.test(content)) {
      content = content.replace(targetPattern, replacement);
      fs.writeFileSync(file, content, "utf8");
      console.log(`[patch] Successfully patched thoughtSignature bypass in: ${path.relative(process.cwd(), file)}`);
    } else {
      console.log(`[patch] Target pattern not found in: ${path.relative(process.cwd(), file)}`);
    }
  }
}
