import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Class Features", "Monk", "Stunning Blows"];

export const actions: Assistant.Action[] = [
    {
        trigger: "damage-roll",
        predicate: ["stunning-blows"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;

            game.assistant.socket.rollSave(data.target.actor, "fortitude", {
                origin: data.speaker.actor,
                dc: Utils.Actor.getClassDC(data.speaker.actor),
                extraRollOptions: ["stunning-blows"],
            });
        },
    },
    {
        trigger: "saving-throw",
        predicate: ["stunning-blows", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(data.speaker.actor, "stunned", 1);
            if (conditionValue) reroll.setCondition.push({ actor: data.speaker.actor.uuid, condition: "stunned", value: conditionValue });

            return reroll;
        },
    },
    {
        trigger: "saving-throw",
        predicate: ["stunning-blows", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(data.speaker.actor, "stunned", 3);
            if (conditionValue) reroll.setCondition.push({ actor: data.speaker.actor.uuid, condition: "stunned", value: conditionValue });

            return reroll;
        },
    },
];
