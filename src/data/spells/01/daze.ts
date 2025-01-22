import { Assistant } from "assistant.ts";

export const path = ["Spells", "1st Rank", "Daze"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:daze", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(data.speaker.actor, "stunned", 1);
            if (conditionValue) reroll.setCondition.push({ actor: data.speaker.actor.uuid, condition: "stunned", value: conditionValue });

            return reroll;
        },
    },
];
