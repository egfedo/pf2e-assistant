import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Spells", "4th Rank", "Vision of Death"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:vision-of-death", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(
                data.speaker.actor,
                "frightened",
                1
            );

            if (conditionValue)
                reroll.setCondition.push({
                    actor: data.speaker.actor.uuid,
                    condition: "frightened",
                    value: conditionValue
                });

            return reroll;
        }
    },
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:vision-of-death", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(
                data.speaker.actor,
                "frightened",
                2
            );

            if (conditionValue)
                reroll.setCondition.push({
                    actor: data.speaker.actor.uuid,
                    condition: "frightened",
                    value: conditionValue
                });

            return reroll;
        }
    },
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:vision-of-death", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            const reroll = Assistant.createReroll();

            const conditionValue = await game.assistant.socket.setCondition(
                data.speaker.actor,
                "frightened",
                4
            );

            if (conditionValue)
                reroll.setCondition.push({
                    actor: data.speaker.actor.uuid,
                    condition: "frightened",
                    value: conditionValue
                });

            const effect = await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_ASSISTANT_EFFECTS["spell-effect-vision-of-death"],
                {
                    origin: data.origin,
                    item: data.item,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (effect) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: effect });

            return reroll;
        }
    },
    {
        trigger: "delete-effect",
        predicate: ["item:frightened", "self:effect:vision-of-death"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            if (!data.speaker.actor.hasCondition("frightened")) {
                const effect = Utils.Actor.getEffect(
                    data.speaker.actor,
                    "spell-effect-vision-of-death"
                );

                if (effect) {
                    await game.assistant.socket.deleteEmbeddedItem(effect);
                }
            }
        }
    }
];
