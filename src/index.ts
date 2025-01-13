import { ChatMessagePF2e } from "foundry-pf2e";
import { AssistantSocket } from "./socket.ts";
import { AssistantStorage } from "./storage.ts";
import { createMessage } from "./message.ts";
import { AssistantSettings } from "settings.ts";

Hooks.once("init", function () {
    game.settings.registerMenu("pf2e-assistant", "automationMenu", {
        name: "Automations",
        label: "Manage Automations",
        hint: "Allows you to manage which automations are enabled/disabled.",
        icon: "fas fa-gears",
        type: AssistantSettings,
        restricted: true
    });

    game.settings.register("pf2e-assistant", "disabledFiles", {
        name: "Disabled Automations",
        scope: "world",
        config: false,
        type: Array,
        default: []
    });

    Object.assign(game, {
        assistant: {
            socket: new AssistantSocket(),
            storage: new AssistantStorage(),
        },
    });
});

Hooks.once("ready", function () {
    Hooks.on("createChatMessage", createChatMessage);
});

async function createChatMessage(chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;

    game.assistant.storage.process(createMessage(chatMessage));
}
