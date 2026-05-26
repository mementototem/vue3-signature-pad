export const GET = () => {
	const mcpServerCard = {
		$schema:
			"https://github.com/modelcontextprotocol/modelcontextprotocol/raw/main/schema/mcp-server-card.schema.json",
		serverInfo: {
			name: "vue3-signature-pad",
			version: "1.9.0",
			description:
				"Vue 3 based smooth signature drawing component - documentation and resources",
		},
		capabilities: {
			resources: true,
		},
		transport: {
			type: "http",
			endpoint: "https://vue3-signature-pad.vercel.app/",
		},
	};

	return new Response(JSON.stringify(mcpServerCard, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
