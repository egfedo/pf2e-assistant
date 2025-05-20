import { extractPack } from "@foundryvtt/foundryvtt-cli";

await extractPack("packs/effects", "src/packs/effects", { clean: true });
await extractPack("packs/macros", "src/packs/macros", { clean: true });
