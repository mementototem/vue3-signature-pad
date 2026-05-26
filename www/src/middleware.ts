import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
	const { request, url } = context;

	// Add Link headers for agent discovery (RFC 8288)
	const linkHeaders = [
		'</.well-known/api-catalog.json>; rel="api-catalog"',
		'</.well-known/agent-skills/index.json>; rel="index"',
		'</.well-known/mcp/server-card.json>; rel="alternate"; type="application/json"',
		'</sitemap.xml>; rel="sitemap"',
		'</robots.txt>; rel="robots"',
	];

	// Check if the request accepts markdown (Markdown for Agents)
	const acceptHeader = request.headers.get("accept") || "";
	const acceptsMarkdown = acceptHeader.includes("text/markdown");

	// If it's the homepage and markdown is requested, return markdown version
	if (url.pathname === "/" && acceptsMarkdown) {
		const markdownContent = `# Vue 3 Signature Pad

A beautiful signature pad component for Vue 3.

## Installation

\`\`\`bash
npm install @selemondev/vue3-signature-pad
\`\`\`

## Usage

\`\`\`vue
<script setup>
import { SignaturePad } from '@selemondev/vue3-signature-pad'
</script>

<template>
  <SignaturePad />
</template>
\`\`\`

## Features

- Smooth signature drawing
- Configurable options
- TypeScript support
- Vue 3 composition API

## Documentation

For more information, visit: https://github.com/selemondev/vue3-signature-pad

## Links

- GitHub: https://github.com/selemondev/vue3-signature-pad
- Twitter: https://twitter.com/selemondev
`;

		return new Response(markdownContent, {
			status: 200,
			headers: {
				"Content-Type": "text/markdown; charset=utf-8",
				Link: linkHeaders.join(", "),
			},
		});
	}

	// Get the response
	const response = await next();

	// Add Link headers to all responses
	if (response.headers) {
		// Clone headers to make them mutable
		const newHeaders = new Headers(response.headers);
		newHeaders.set("Link", linkHeaders.join(", "));

		// Return new response with updated headers
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders,
		});
	}

	return response;
};
