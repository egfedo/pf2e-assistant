import { ChatMessagePF2e } from "foundry-pf2e";
import { AssistantSocket } from "./socket.ts";
import { AssistantStorage } from "./storage.ts";
import { createMessage } from "./message.ts";

Hooks.once("init", function () {
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
