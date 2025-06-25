import { Assistant } from "assistant.ts";
import "effects.ts";
import "./settings.ts";
import "./triggers/index.ts";

const PF2E_VERSION = "7.2.1";

Hooks.once("ready", async function () {
    Object.assign(game, { assistant: { socket: new Assistant.Socket(), storage: new Assistant.Storage() } });

    if (game.system.version != PF2E_VERSION && game.user.isGM) {
        foundry.ui.notifications.warn(
            `PF2e Assistant v${game.modules.get("pf2e-assistant")?.version} was built for PF2e v${PF2E_VERSION}. It appears that you are currently running PF2e v${game.system.version} which might not be compatible.`
        );
    }
});
