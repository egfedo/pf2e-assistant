import { defineConfig } from "vite";
import module from "./module.json" with { type: "json" };

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
                    return module.id
                }
            }
        },
        sourcemap: true,
    }
});