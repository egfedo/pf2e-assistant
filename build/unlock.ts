import Config from "@foundryvtt/foundryvtt-cli/config.mjs";
import fs from "fs";
import path from "path";

const dataPath = Config.instance.get("dataPath") as string;
if (!dataPath) {
    console.error(
        "The data path is not set. Use `npm run fvtt configure set dataPath <path>` to set it. " +
        "Data paths look like `C:/Users/Example/AppData/Local/FoundryVTT/Data`",
    );
    process.exit(1);
}

const lockPath = path.resolve(dataPath, "config", "options.json.lock");
fs.rmSync(lockPath, { recursive: true, force: true });