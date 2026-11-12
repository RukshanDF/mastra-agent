/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js loads these packages directly from node_modules
  serverExternalPackages: ["@mastra/core", "@ai-sdk/google"],
};

export default nextConfig;
