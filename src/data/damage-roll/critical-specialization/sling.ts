import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:sling"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.target?.actor) return;

            game.assistant.socket.rollSave(message.target.actor, "reflex", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:sling"],
            });
        },
    },
];
