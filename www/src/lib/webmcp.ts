// WebMCP integration for vue3-signature-pad documentation
// This script provides AI agents with discoverable tools to interact with the site

export function initializeWebMCP() {
	if (typeof window === "undefined") return;

	// Check if the browser supports WebMCP (Model Context Protocol)
	if (!("modelContext" in navigator)) {
		console.info(
			"WebMCP not supported in this browser. This is normal for non-WebMCP enabled browsers.",
		);
		return;
	}

	try {
		// @ts-ignore - navigator.modelContext is experimental
		navigator.modelContext.provideContext({
			tools: [
				{
					name: "get_package_info",
					description:
						"Get information about the vue3-signature-pad package including version, installation, and usage",
					inputSchema: {
						type: "object",
						properties: {},
					},
					execute: async () => {
						return {
							name: "@selemondev/vue3-signature-pad",
							version: "1.9.0",
							description: "Vue 3 based smooth signature drawing component",
							installation: "npm install @selemondev/vue3-signature-pad",
							repository: "https://github.com/selemondev/vue3-signature-pad",
							documentation:
								"https://github.com/selemondev/vue3-signature-pad#readme",
							usage: `import { SignaturePad } from '@selemondev/vue3-signature-pad'\n\n<template>\n  <SignaturePad />\n</template>`,
						};
					},
				},
				{
					name: "get_features",
					description:
						"Get a list of features and capabilities of the vue3-signature-pad component",
					inputSchema: {
						type: "object",
						properties: {},
					},
					execute: async () => {
						return {
							features: [
								"Smooth signature drawing with configurable pen styles",
								"Multiple export formats (PNG, JPEG, SVG)",
								"Undo/redo functionality",
								"Customizable colors and styling",
								"TypeScript support with full type definitions",
								"Vue 3 Composition API",
								"Lightweight and performant",
								"Touch and mouse input support",
								"Responsive design",
							],
						};
					},
				},
				{
					name: "get_installation_guide",
					description:
						"Get detailed installation instructions for different package managers and frameworks",
					inputSchema: {
						type: "object",
						properties: {
							framework: {
								type: "string",
								enum: ["vue3", "nuxt3"],
								description: "The framework to get installation instructions for",
							},
						},
					},
					execute: async (input: { framework?: string }) => {
						const framework = input.framework || "vue3";

						if (framework === "nuxt3") {
							return {
								framework: "Nuxt 3",
								command: "npx nuxi@latest module add vue3-signature-pad",
								usage:
									"The module will be auto-imported and available globally in your Nuxt application",
							};
						}

						return {
							framework: "Vue 3",
							npm: "npm install @selemondev/vue3-signature-pad",
							pnpm: "pnpm add @selemondev/vue3-signature-pad",
							yarn: "yarn add @selemondev/vue3-signature-pad",
							import:
								"import { SignaturePad } from '@selemondev/vue3-signature-pad'",
							usage: "Register as a local component and use in your templates",
						};
					},
				},
				{
					name: "get_documentation_url",
					description:
						"Get the URL to the full documentation on GitHub with props, events, and API reference",
					inputSchema: {
						type: "object",
						properties: {},
					},
					execute: async () => {
						return {
							documentation:
								"https://github.com/selemondev/vue3-signature-pad#readme",
							props_reference:
								"https://github.com/selemondev/vue3-signature-pad#props",
							events_reference:
								"https://github.com/selemondev/vue3-signature-pad#events",
						};
					},
				},
			],
		});

		console.info("WebMCP tools registered successfully");
	} catch (error) {
		console.error("Failed to register WebMCP tools:", error);
	}
}
