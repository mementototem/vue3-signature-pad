export const GET = () => {
	const apiCatalog = {
		linkset: [
			{
				anchor: "https://vue3-signature-pad.vercel.app/",
				"service-desc": [
					{
						href: "https://github.com/selemondev/vue3-signature-pad",
						type: "text/html",
					},
				],
				"service-doc": [
					{
						href: "https://vue3-signature-pad.vercel.app/",
						type: "text/html",
					},
				],
				status: [
					{
						href: "https://vue3-signature-pad.vercel.app/sitemap.xml",
						type: "application/xml",
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
