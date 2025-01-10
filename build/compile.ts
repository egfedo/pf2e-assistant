import { compilePack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs";

fs.rmSync("packs/pf2e-assistant-effects", { force: true, recursive: true, maxRetries: 10 });
await compilePack("src/packs/pf2e-assistant-effects", "packs/pf2e-assistant-effects");
