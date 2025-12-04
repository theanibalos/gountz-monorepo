import { defineConfig } from "@rsbuild/core";

// Docs: https://rsbuild.rs/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
});
