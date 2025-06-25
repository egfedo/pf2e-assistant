import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Spells", "1st Rank", "Befuddle"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:befuddle", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            reroll.removeItem.push(
                ...(await game.assistant.socket.addEffect(
                    data.speaker.actor,
                    PF2E_ASSISTANT_EFFECTS["spell-effect-befuddle-critical-failure"],
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
        predicate: ["item:type:spell", "item:befuddle", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            reroll.removeItem.push(
                ...(await game.assistant.socket.addEffect(
                    data.speaker.actor,
                    PF2E_ASSISTANT_EFFECTS["spell-effect-befuddle-failure"],
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
        predicate: ["item:type:spell", "item:befuddle", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            reroll.removeItem.push(
                ...(await game.assistant.socket.addEffect(
                    data.speaker.actor,
                    PF2E_ASSISTANT_EFFECTS["spell-effect-befuddle-success"],
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
