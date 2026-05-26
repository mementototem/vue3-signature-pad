# Agent Readiness Implementation

This document describes the agent readiness features implemented for the vue3-signature-pad documentation site.

## Features Implemented

### 1. robots.txt with AI Crawler Rules and Content Signals
- **Location**: `/www/public/robots.txt`
- **Features**:
  - Rules for general web crawlers
  - Specific rules for AI crawlers (GPTBot, OAI-SearchBot, Claude-Web, Google-Extended, etc.)
  - Content Signals directives (`ai-train=yes, search=yes, ai-input=yes`)
  - Sitemap reference

### 2. Sitemap
- **Location**: `/www/src/pages/sitemap.xml.ts`
- **Features**:
  - Dynamic XML sitemap generation
  - Includes homepage with metadata
  - Referenced from robots.txt
  - Proper Content-Type and caching headers

### 3. API Catalog (RFC 9727)
- **Location**: `/www/src/pages/.well-known/api-catalog.json.ts`
- **Features**:
  - Linkset format for API discovery
  - References to documentation
  - Proper Content-Type (`application/linkset+json`)

### 4. MCP Server Card
- **Location**: `/www/src/pages/.well-known/mcp/server-card.json.ts`
- **Features**:
  - Server information (name, version, description)
  - Capabilities declaration
  - Transport endpoint configuration

### 5. Agent Skills Discovery Index
- **Location**: `/www/src/pages/.well-known/agent-skills/index.json.ts`
- **Features**:
  - Compliant with Agent Skills Discovery RFC v0.2.0
  - Lists all available agent skills
  - Includes SHA-256 digests for each skill

### 6. Link Response Headers (RFC 8288)
- **Location**: `/www/src/middleware.ts`
- **Features**:
  - Link headers for agent discovery
  - References to api-catalog, agent-skills index, MCP server card, sitemap, and robots.txt
  - Applied to all responses

### 7. Markdown for Agents Support
- **Location**: `/www/src/middleware.ts`
- **Features**:
  - Content negotiation based on Accept header
  - Markdown version of homepage when `Accept: text/markdown` is requested
  - Proper Content-Type (`text/markdown`)

### 8. WebMCP Support
- **Location**: `/www/src/lib/webmcp.ts` and `/www/src/layouts/default.astro`
- **Features**:
  - Browser-based Model Context Protocol support
  - Discoverable tools for AI agents:
    - `get_package_info`: Package metadata and installation
    - `get_features`: Component features list
    - `get_installation_guide`: Framework-specific installation
    - `get_documentation_url`: Documentation references

## How It Works

1. **Static Files**: `robots.txt` is served directly from `/public`
2. **API Endpoints**: `.well-known` resources and `sitemap.xml` are server-rendered
3. **Middleware**: Adds Link headers and handles markdown negotiation for all requests
4. **WebMCP**: Initialized on page load to expose tools to compatible browsers

## Testing

The implementation has been tested with:
- Build process: `pnpm --filter www build` ✓
- All routes are correctly configured in Vercel output
- Static assets are properly copied

## References

- [RFC 9309 - robots.txt](https://www.rfc-editor.org/rfc/rfc9309)
- [RFC 9727 - API Catalog](https://www.rfc-editor.org/rfc/rfc9727)
- [RFC 8288 - Link Headers](https://www.rfc-editor.org/rfc/rfc8288)
- [Content Signals](https://contentsignals.org/)
- [Agent Skills Discovery RFC](https://github.com/cloudflare/agent-skills-discovery-rfc)
- [WebMCP](https://webmachinelearning.github.io/webmcp/)
- [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
