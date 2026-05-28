export const GET = () => {
	const config = {
		issuer: "https://vue3-signature-pad.vercel.app",
		jwks_uri: "https://vue3-signature-pad.vercel.app/.well-known/jwks.json",
		response_types_supported: ["none"],
		subject_types_supported: ["public"],
		id_token_signing_alg_values_supported: ["none"],
		grant_types_supported: [],
		scopes_supported: [],
		claims_supported: [],
		service_documentation: "https://vue3-signature-pad.vercel.app/",
	};

	return new Response(JSON.stringify(config, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
