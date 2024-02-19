import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /*eslint no-undef: "off"*/
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: "affan-q3",
        project: "javascript-react",
        authToken: env.SENTRY_AUTH_TOKEN,
      }),
    ],

    build: {
      sourcemap: true,
    },
  };
});

