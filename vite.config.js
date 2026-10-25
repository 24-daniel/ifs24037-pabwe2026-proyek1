import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(env.APP_PORT) || 3000;

  if (mode === "production" && !env.VITE_API_BASEURL) {
    throw new Error("VITE_API_BASEURL wajib diisi dengan URL API backend sebelum build production.");
  }

  return {
    plugins: [vue(), tailwindcss()],
    server: { port },
    preview: { port },
    define: {
      API_BASEURL: JSON.stringify(env.VITE_API_BASEURL || "http://localhost:8000/api/v1"),
    },
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["text", "lcov"],
        include: ["src/**/*.js"],
        exclude: ["src/main.js", "src/router.js", "**/constants.js", "**/*.test.js"],
      },
    },
  };
});