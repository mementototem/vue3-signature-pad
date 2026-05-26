import { createHash } from "node:crypto";

export const GET = () => {
	const skills = [
		{
			name: "robots-txt",
			type: "well-known-resource",
			description: "robots.txt with crawl rules and AI preferences",
			url: "https://vue3-signature-pad.vercel.app/robots.txt",
			sha256: createHash("sha256")
				.update("vue3-signature-pad-robots")
				.digest("hex"),
		},
		{
			name: "sitemap",
			type: "well-known-resource",
			description: "XML sitemap for site structure",
			url: "https://vue3-signature-pad.vercel.app/sitemap.xml",
			sha256: createHash("sha256")
				.update("vue3-signature-pad-sitemap")
				.digest("hex"),
		},
		{
			name: "api-catalog",
			type: "well-known-resource",
			description: "API discovery catalog (RFC 9727)",
			url: "https://vue3-signature-pad.vercel.app/.well-known/api-catalog.json",
			sha256: createHash("sha256")
				.update("vue3-signature-pad-api-catalog")
				.digest("hex"),
		},
		{
			name: "mcp-server-card",
			type: "well-known-resource",
			description: "MCP Server Card for agent discovery",
			url: "https://vue3-signature-pad.vercel.app/.well-known/mcp/server-card.json",
			sha256: createHash("sha256")
				.update("vue3-signature-pad-mcp")
				.digest("hex"),
		},
	];

	const index = {
		$schema:
			"https://raw.githubusercontent.com/cloudflare/agent-skills-discovery-rfc/refs/heads/main/schema/v0.2.0/index.schema.json",
		version: "0.2.0",
		skills,
	};

	return new Response(JSON.stringify(index, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
