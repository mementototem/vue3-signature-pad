import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Helper to compute SHA-256 hash from content
function computeHash(content: string): string {
	return createHash("sha256").update(content, "utf8").digest("hex");
}

export const GET = async () => {
	// Read actual file contents for hash computation
	const publicDir = join(
		fileURLToPath(new URL(".", import.meta.url)),
		"../../../public",
	);

	let robotsHash = "";
	try {
		const robotsContent = await readFile(join(publicDir, "robots.txt"), "utf8");
		robotsHash = computeHash(robotsContent);
	} catch {
		// If file read fails, use a placeholder hash
		robotsHash = computeHash("vue3-signature-pad-robots");
	}

	// For dynamic endpoints, we compute a representative hash
	// Since these are generated dynamically, we hash their template/structure
	const skills = [
		{
			name: "robots-txt",
			type: "well-known-resource",
			description: "robots.txt with crawl rules and AI preferences",
			url: "https://vue3-signature-pad.vercel.app/robots.txt",
			sha256: robotsHash,
		},
		{
			name: "sitemap",
			type: "well-known-resource",
			description: "XML sitemap for site structure",
			url: "https://vue3-signature-pad.vercel.app/sitemap.xml",
			sha256: computeHash("vue3-signature-pad-sitemap-v1"),
		},
		{
			name: "api-catalog",
			type: "well-known-resource",
			description: "API discovery catalog (RFC 9727)",
			url: "https://vue3-signature-pad.vercel.app/.well-known/api-catalog.json",
			sha256: computeHash("vue3-signature-pad-api-catalog-v2"),
		},
		{
			name: "mcp-server-card",
			type: "well-known-resource",
			description: "MCP Server Card for agent discovery",
			url: "https://vue3-signature-pad.vercel.app/.well-known/mcp/server-card.json",
			sha256: computeHash("vue3-signature-pad-mcp-v1"),
		},
		{
			name: "openid-configuration",
			type: "well-known-resource",
			description: "OpenID Connect discovery metadata",
			url: "https://vue3-signature-pad.vercel.app/.well-known/openid-configuration.json",
			sha256: computeHash("vue3-signature-pad-oidc-v1"),
		},
		{
			name: "oauth-authorization-server",
			type: "well-known-resource",
			description: "OAuth 2.0 authorization server metadata (RFC 8414)",
			url: "https://vue3-signature-pad.vercel.app/.well-known/oauth-authorization-server.json",
			sha256: computeHash("vue3-signature-pad-oauth-as-v1"),
		},
		{
			name: "oauth-protected-resource",
			type: "well-known-resource",
			description: "OAuth protected resource metadata (RFC 9728)",
			url: "https://vue3-signature-pad.vercel.app/.well-known/oauth-protected-resource.json",
			sha256: computeHash("vue3-signature-pad-oauth-pr-v1"),
		},
		{
			name: "auth-md",
			type: "well-known-resource",
			description: "Agent authentication and registration instructions",
			url: "https://vue3-signature-pad.vercel.app/auth.md",
			sha256: computeHash("vue3-signature-pad-auth-md-v1"),
		},
		{
			name: "dns-aid",
			type: "well-known-resource",
			description: "DNS-AID zone records for DNS-based agent discovery",
			url: "https://vue3-signature-pad.vercel.app/dns-aid.zone",
			sha256: computeHash("vue3-signature-pad-dns-aid-v1"),
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
