# pure.md MCP server

[![smithery badge](https://smithery.ai/badge/@puremd/puremd-mcp)](https://smithery.ai/server/@puremd/puremd-mcp)

Welcome to the Model Context Protocol (MCP) server for [pure.md](https://pure.md).

![pure.md - Markdown delivery network for LLMs](https://pure.md/assets/og.png)

[pure.md](https://pure.md) lets your scripts, APIs, apps, agents, etc reliably access web content in markdown format -- simply prefix any URL with `pure.md/`.
It avoids bot detection and renders JavaScript for SPAs, and can convert HTML, PDFs, images, and more into pure markdown. Like a CDN for markdown content, it globally caches responses for future requests to the same resource, relieving stress on origin web servers.

**Without puremd-mcp, local agents may fail to fetch web content.** puremd-mcp teaches MCP clients like Cursor, Windsurf, and Claude Desktop how to adopt the functionality of pure.md, giving them web unblocking and searching capabilities.

puremd-mcp comes with two tools:

- `unblock-url` - Extract markdown from web pages without getting blocked
- `search-web` - Search the web for a query and concatenate results into markdown

The [Model Context Protocol](https://modelcontextprotocol.io/introduction), developed by Anthropic, is an open standard that enables AI systems to seamlessly interact with an ecosystem of tooling. With it, MCP clients like Cursor, Windsurf, and Claude Desktop can learn how to use a variety of APIs and other functionality.

## Authentication

Generating an API key is an optional step that unlocks higher rate limits. If you'd like to use the pure.md MCP server anonymously, simply set your `PUREMD_API_KEY` value to empty string (`""`).

1. Sign up for a new account at [pure.md](https://pure.md) &mdash; it's free to sign up!
2. In the dashboard, generate a new API token
3. Copy the token, and use it for the `PUREMD_API_KEY` value in your MCP client's configuration file (see below)

## Client configuration

### Cursor

Add the following to your `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "pure.md": {
      "command": "npx",
      "args": ["-y", "puremd-mcp"],
      "env": {
        "PUREMD_API_KEY": "<TOKEN>"
      }
    }
  }
}
```

### Windsurf

Add the following to your `./codeium/windsurf/model_config.json` file:

```json
{
  "mcpServers": {
    "pure.md": {
      "command": "npx",
      "args": ["-y", "puremd-mcp"],
      "env": {
        "PUREMD_API_KEY": "<TOKEN>"
      }
    }
  }
}
```

### Claude Desktop

Add the following to your `~/Library/Application\ Support/Claude/claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "pure.md": {
      "command": "npx",
      "args": ["-y", "puremd-mcp"],
      "env": {
        "PUREMD_API_KEY": "<TOKEN>"
      }
    }
  }
}
```

### Installing via Smithery

To install puremd-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@puremd/puremd-mcp):

```bash
npx -y @smithery/cli install @puremd/puremd-mcp --client claude
```
