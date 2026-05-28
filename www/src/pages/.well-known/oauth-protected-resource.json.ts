export const GET = () => {
	const metadata = {
		resource: "https://vue3-signature-pad.vercel.app",
		authorization_servers: ["https://vue3-signature-pad.vercel.app"],
		scopes_supported: [],
		bearer_methods_supported: ["header"],
	};

	return new Response(JSON.stringify(metadata, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
