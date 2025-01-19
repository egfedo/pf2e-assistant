import { ChatMessagePF2e } from "foundry-pf2e";
import { AssistantSocket } from "./socket.ts";
import { AssistantStorage } from "./storage.ts";
import { AssistantMessage, createMessage } from "./message.ts";
import { AssistantSettings } from "apps/settings.ts";
import { Utils } from "utils.ts";

Hooks.once("init", function () {
    game.settings.registerMenu("pf2e-assistant", "automationMenu", {
        name: "Automations",
        label: "Manage Automations",
        hint: "Allows you to manage which automations are enabled/disabled.",
        icon: "fas fa-gears",
        type: AssistantSettings,
        restricted: true,
    });

    game.settings.register("pf2e-assistant", "disabledFiles", {
        name: "Disabled Automations",
        scope: "world",
        config: false,
        type: Array,
        default: [],
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
    if (chatMessage.getFlag("pf2e-assistant", "process") === false) return;

    game.assistant.storage.process(createMessage(chatMessage));
}

Hooks.on("renderChatLog", function (_application: ChatLog, $html: JQuery, _data: ChatLogOptions) {
    const html = $html[0];
    html.addEventListener("click", async function (event: MouseEvent) {
        const { message } = Utils.ChatLog.getMessage(event);
        if (!message) return;

        const button = Utils.DOM.htmlClosest<HTMLButtonElement>(event.target, "button[data-action]");
        if (!button) return;

        if (button.dataset.action === "choice") {
            let data: AssistantMessage = {
                trigger: "choice",
                rollOptions: [`choice:${button.value}`],
            };

            if (message.actor && message.token) {
                data.speaker = {
                    actor: message.actor,
                    token: message.token,
                };
            }

            if (message.target) {
                data.target = {
                    actor: message.target.actor,
                    token: message.target.token,
                };
            }

            if (message.item) {
                data.item = message.item;
                data.rollOptions.push(...message.item.getRollOptions());
            }

            game.assistant.storage.process(data);
            game.assistant.socket.deleteChatMessage(message);
        }
    });
});
