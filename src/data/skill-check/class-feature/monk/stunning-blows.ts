import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["stunning-blows"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["stunning-blows"],
            });
        },
    },
    {
        trigger: "saving-throw",
        predicate: ["stunning-blows", "check:outcome:failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.origin?.actor) return;

            await game.assistant.socket.setCondition(message.speaker.actor, "stunned", 1);
        },
    },
    {
        trigger: "saving-throw",
        predicate: ["stunning-blows", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.origin?.actor) return;

            await game.assistant.socket.setCondition(message.speaker.actor, "stunned", 3);
        },
    },
];
