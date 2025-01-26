import { extractPack } from "@foundryvtt/foundryvtt-cli";

async function transformEntry(entry: any) {
    if (entry["system"]) {
        if (entry["system"]["_migration"]) {
            delete entry["system"]["_migration"];
        }
    }

    if (entry["ownership"]) {
        entry["ownership"] = {
            default: 0
        };
    }

    if (entry["_stats"]) {
        delete entry["_stats"];
    }
}

await extractPack("packs/effects", "src/packs/effects", { clean: true, transformEntry });
await extractPack("packs/macros", "src/packs/macros", { clean: true, transformEntry });
