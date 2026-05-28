export const GET = () => {
	const metadata = {
		issuer: "https://vue3-signature-pad.vercel.app",
		response_types_supported: ["none"],
		grant_types_supported: [],
		scopes_supported: [],
		service_documentation: "https://vue3-signature-pad.vercel.app/",
		agent_auth: {
			supported_identity_types: ["public"],
			supported_credential_types: ["none"],
		},
	};

	return new Response(JSON.stringify(metadata, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
