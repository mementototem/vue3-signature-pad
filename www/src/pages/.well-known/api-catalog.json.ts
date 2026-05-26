export const GET = () => {
	const apiCatalog = {
		linkset: [
			{
				anchor: "https://vue3-signature-pad.vercel.app/",
				describedby: [
					{
						href: "https://github.com/selemondev/vue3-signature-pad",
						type: "text/html",
					},
				],
			},
		],
	};

	return new Response(JSON.stringify(apiCatalog, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/linkset+json",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
