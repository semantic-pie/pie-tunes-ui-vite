import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@slices": path.resolve(__dirname, "./src/slices"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [preact()],
});
