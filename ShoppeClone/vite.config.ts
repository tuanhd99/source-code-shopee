import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  server: {
    host: "dev.shopee.com",
    port: 10000,
    https: {
      key: fs.readFileSync("./Certificate/key.pem"),
      cert: fs.readFileSync("./Certificate/cert.pem")
    }
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  }
});
