import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "saving-throw",
        predicate: [
            {
                or: ["check:outcome:failure", "check:outcome:critical-failure"],
            },
            "critical-specialization",
            "item:group:hammer",
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.origin?.actor) return;

            await game.assistant.socket.toggleCondition(message.speaker?.actor, "prone", { active: true });
        },
    },
];
