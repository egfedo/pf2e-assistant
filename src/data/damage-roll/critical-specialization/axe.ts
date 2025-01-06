import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:axe"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.target?.actor) return;
        },
    }
];
