import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  root: "sources",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true
  },
  plugins: [glsl(), viteCompression()]
});
