import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import pkgJson from "../package.json" assert { type: "json" };

const { PUREMD_API_KEY = "" } = process.env;

const server = new McpServer(
  {
    name: "pure.md",
    version: pkgJson.version,
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  },
);

server.tool("unblock-url", { url: z.string() }, async ({ url }) => {
  try {
    const response = await fetch(`https://pure.md/${url}`, {
      headers: { "x-puremd-api-token": PUREMD_API_KEY },
    });
    const markdown = await response.text();
    return {
      content: [{ type: "text", text: markdown }],
      isError: false,
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: (error as Error).message }],
      isError: true,
    };
  }
});

server.tool("search-web", { query: z.string() }, async ({ query }) => {
  try {
    const response = await fetch(`https://pure.md/search?q=${query}`, {
      headers: { "x-puremd-api-token": PUREMD_API_KEY },
    });
    const markdown = await response.text();
    return {
      content: [{ type: "text", text: markdown }],
      isError: false,
    };
  } catch (error) {
    return {
      content: [{ type: "text", text: (error as Error).message }],
      isError: true,
    };
  }
});

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("pure.md mcp server running on stdio");
  } catch (error) {
    console.error(`Failed to start server: ${(error as Error).message}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
