import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log("VITE_API_URL:", env.VITE_API_URL); // Debug log to check the value

  return {
    plugins: [react()],
    define: {
      "process.env": {
        VITE_API_URL: env.VITE_API_URL,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "dist",
    },
  };
});
