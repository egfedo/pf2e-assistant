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
        Hooks.on("diceSoNiceMessageProcessed", diceSoNiceMessageProcessed);
    } else {
        Hooks.on("createChatMessage", createChatMessage);
    }
});

async function createChatMessage(chatMessage: Maybe<ChatMessagePF2e>) {
    if (!chatMessage) return;
    if (!chatMessage.isAuthor) return;

    game.assistant.storage.process(new AssistantMessage(chatMessage));
}

async function diceSoNiceMessageProcessed(messageId: string, { willTrigger3DRoll }: { willTrigger3DRoll: boolean }) {
    if (willTrigger3DRoll) {
        await game.dice3d.waitFor3DAnimationByMessageID(messageId);
    }

    createChatMessage(game.messages.get(messageId));
}
