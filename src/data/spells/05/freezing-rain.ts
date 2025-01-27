import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Spells", "5th Rank", "Freezing Rain"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:freezing-rain", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(
                data.speaker.actor,
                "slowed",
                1
            );

            if (Utils.Remeda.isNonNullish(conditionValue))
                reroll.setCondition.push({
                    actor: data.speaker.actor.uuid,
                    condition: "slowed",
                    value: conditionValue
                });

            return reroll;
        }
    },
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:freezing-rain", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(
                data.speaker.actor,
                "slowed",
                2
            );

            if (Utils.Remeda.isNonNullish(conditionValue))
                reroll.setCondition.push({
                    actor: data.speaker.actor.uuid,
                    condition: "slowed",
                    value: conditionValue
                });

            return reroll;
        }
    }
];
