export const GET = () => {
	const content = `# Auth.md

## vue3-signature-pad

This is a public documentation site for the vue3-signature-pad Vue 3 component library.

### Authentication

No authentication is required. All resources on this site are publicly accessible.

### Agent Registration

No agent registration is required. All documentation and resources are freely available without credentials.

### Endpoints

- Documentation: https://vue3-signature-pad.vercel.app/
- API Catalog: https://vue3-signature-pad.vercel.app/.well-known/api-catalog.json
- OAuth Metadata: https://vue3-signature-pad.vercel.app/.well-known/oauth-authorization-server.json
- Protected Resource Metadata: https://vue3-signature-pad.vercel.app/.well-known/oauth-protected-resource.json
- OpenID Configuration: https://vue3-signature-pad.vercel.app/.well-known/openid-configuration.json

### Access Policy

All content is publicly available. No tokens, API keys, or credentials are needed.
`;

	return new Response(content, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
