import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Spells", "1st Rank", "Frostbite"];

export const actions: Assistant.Action[] = [
    {
        trigger: "saving-throw",
        predicate: ["item:type:spell", "item:frostbite", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            if (!data.item?.isOfType("spell")) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const effect = await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-frostbite"],
                {
                    origin: data.origin,
                    item: data.item,
                    target: data.speaker,
                    roll: data.roll
                }
            );

            if (effect) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: effect });

            return reroll;
        }
    }
];
