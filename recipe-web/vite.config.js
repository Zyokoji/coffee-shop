import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // If 5173 is busy, stop with an error instead of quietly moving to 5174.
    // (5174 is not on the API's CORS guest list, so it would fail in a confusing way.)
    strictPort: true,
  },
});
