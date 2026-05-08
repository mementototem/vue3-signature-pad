import Vue from "unplugin-vue/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [Vue()],
	test: {
		environment: "happy-dom",
		coverage: {
			provider: "v8",
			reporter: ["text", "json-summary"],
			include: ["src/**/*.{ts,vue}"],
			exclude: ["src/types/**/*.ts"],
		},
	},
});
