import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const apiUrl =
    mode === "production"
      ? env.VITE_API_URL_PRODUCTION
      : env.VITE_API_URL_LOCAL;

  console.log("API URL:", apiUrl);

  return {
    plugins: [react()],
    define: {
      "process.env": {
        VITE_API_URL: apiUrl,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: apiUrl,
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
