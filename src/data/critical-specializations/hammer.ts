import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const label = "Critical Specializations | Hammer";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:hammer"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.target?.actor) return;

            game.assistant.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:hammer"],
            });
        },
    },
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
