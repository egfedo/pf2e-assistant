import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

Hooks.on("renderChatLog", function (_application: ChatLog, html: JQuery, _data: ChatLogOptions) {
    html[0].addEventListener("click", async function (event: MouseEvent) {
        const { message } = Utils.ChatLog.getMessage(event);
        if (!message) return;

        const button = Utils.DOM.htmlClosest<HTMLButtonElement>(event.target, "button[data-action]");
        if (!button) return;

        if (button.dataset.action === "choice") {
            let data: Assistant.Data = {
                trigger: "choice",
                rollOptions: [`choice:${button.value}`]
            };

            if (message.actor && message.token) {
                data.speaker = {
                    actor: message.actor,
                    token: message.token
                };
            }

            if (message.target?.actor && message.target?.token) {
                data.target = message.target;
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
