import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const frightened = message.target.actor.getCondition("frightened");
            const value = frightened?.value ?? 0;
            if (value < 2) {
                await game.assistant.socket.increaseCondition(message.target.actor, "frightened", { max: 2, value: 2 });
            }
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const frightened = message.target.actor.getCondition("frightened");
            const value = frightened?.value ?? 0;
            if (value < 1) {
                await game.assistant.socket.increaseCondition(message.target.actor, "frightened", { max: 1, value: 1 });
            }
        },
    },
];
