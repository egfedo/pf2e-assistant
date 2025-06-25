import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Spells", "1st Rank", "Chilling Spray"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:chilling-spray", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            reroll.removeItem.push(
                ...(await game.assistant.socket.addEffect(
                    data.speaker.actor,
                    PF2E_ASSISTANT_EFFECTS["spell-effect-chilling-spray-critical-failure"],
                    {
                        origin: data.origin,
                        item: data.item,
                        target: data.speaker,
                        roll: data.roll
                    }
                ))
            );

            return reroll;
        }
    },
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:chilling-spray", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            reroll.removeItem.push(
                ...(await game.assistant.socket.addEffect(
                    data.speaker.actor,
                    PF2E_ASSISTANT_EFFECTS["spell-effect-chilling-spray-failure"],
                    {
                        origin: data.origin,
                        item: data.item,
                        target: data.speaker,
                        roll: data.roll
                    }
                ))
            );

            return reroll;
        }
    }
];
