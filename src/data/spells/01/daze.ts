import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const label = "Spells | 1st Rank | Daze";

export const actions: AssistantAction[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:daze", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            await game.assistant.socket.setCondition(message.speaker.actor, "stunned", 1);
        },
    },
];
