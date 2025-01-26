import { compilePack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs";

fs.rmSync("packs/effects", { force: true, recursive: true, maxRetries: 10 });
fs.rmSync("packs/macros", { force: true, recursive: true, maxRetries: 10 });
await compilePack("src/packs/effects", "packs/effects");
await compilePack("src/packs/macros", "packs/macros");
