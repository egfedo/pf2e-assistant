import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import module from "./module.json" with { type: "json" };
import define from "./vite.defines.ts";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
            fileName: module.id
        },
        rollupOptions: {
            output: {
                manualChunks: () => {
                    return module.id;
                }
            }
        },
        sourcemap: true
    },
    define,
    plugins: [tsconfigPaths()]
});
