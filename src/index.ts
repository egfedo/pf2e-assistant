import { ChatMessagePF2e } from "foundry-pf2e";
import { AssistantSocket } from "./socket.ts";
import { AssistantStorage } from "./storage.ts";
import { AssistantMessage } from "./message.ts";

Hooks.once("init", function () {
    Object.assign(game, {
        assistant: {
            socket: new AssistantSocket(),
            storage: new AssistantStorage(),
        },
    });
});

Hooks.once("ready", function () {
    if (game.modules.get("dice-so-nice")?.active) {
        Hooks.on("diceSoNiceRollComplete", diceSoNiceRollComplete);
    } else {
        Hooks.on("createChatMessage", createChatMessage);
    }
});

async function createChatMessage(chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;

    game.assistant.storage.process(new AssistantMessage(chatMessage));
}

async function diceSoNiceRollComplete(messageId: string) {
    const chatMessage = game.messages.get(messageId);

    if (chatMessage) {
        await createChatMessage(chatMessage);
    }
}
