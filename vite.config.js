import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";
import compress from "vite-plugin-compress";

export default defineConfig({
  root: "sources",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true
  },
  plugins: [glsl(), compress()]
});
