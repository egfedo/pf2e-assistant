import { Assistant } from "assistant.ts";
import "effects.ts";
import "./settings.ts";
import "./triggers/index.ts";

Hooks.once("ready", async function () {
    Object.assign(game, { assistant: { socket: new Assistant.Socket(), storage: new Assistant.Storage() } });

    if (!game.settings.get("pf2e-assistant", "initialized") && game.user.isGM) {
        let compendiumConfiguration = game.settings.get("core", "compendiumConfiguration");
        const packFolders = game.folders.filter((folder) => folder.type === "Compendium" && folder.depth === 1);
        const effectsFolder = packFolders.find((folder) => folder.name === "Effects");
        const macrosFolder = packFolders.find((folder) => folder.name === "Macros");

        if (effectsFolder) {
            const count = Object.values(compendiumConfiguration).reduce(
                (accumulator, currentValue) =>
                    currentValue.folder === effectsFolder.id ? accumulator + 1 : accumulator,
                0
            );
            compendiumConfiguration["pf2e-assistant.effects"] = {
                folder: effectsFolder.id,
                sort: 100000 * (count + 1)
            };
        }

        if (macrosFolder) {
            const count = Object.values(compendiumConfiguration).reduce(
                (accumulator, currentValue) =>
                    currentValue.folder === macrosFolder.id ? accumulator + 1 : accumulator,
                0
            );
            compendiumConfiguration["pf2e-assistant.macros"] = { folder: macrosFolder.id, sort: 100000 * (count + 1) };
        }

        await game.settings.set("core", "compendiumConfiguration", compendiumConfiguration);
        await game.settings.set("pf2e-assistant", "initialized", true);
    }
});
