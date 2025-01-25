import { Assistant } from "assistant.ts";
import "./settings.ts";
import "./triggers/index.ts";

Hooks.once("ready", function () {
    Object.assign(game, {
        assistant: {
            socket: new Assistant.Socket(),
            storage: new Assistant.Storage(),
            getSlugs: Assistant.getSlugs
        }
    });
});
