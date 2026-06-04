import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Allow overriding the base path (useful for GitHub Pages: set VITE_BASE or BASE to "/repo-name/")
const base = process.env.VITE_BASE ?? process.env.BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
});
