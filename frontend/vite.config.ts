import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,            // ✅ allows access via localhost + 192.168.x.x
    port: 8080,
    allowedHosts: true,    // ✅ allow ngrok (and other external hosts)
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000", // ✅ Nest backend
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, ""),
      },
      // If you use websockets:
      "/ws": {
        target: "ws://localhost:3000",
        ws: true,
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/ws/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
