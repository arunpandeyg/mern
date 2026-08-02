import path from "path"
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const alias = {
  "@": path.resolve(__dirname, "src"),
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api/v1/auth",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  
})