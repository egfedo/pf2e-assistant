import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Feats", "Tumble Behind"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: [
            "action:tumble-through",
            { or: ["feat:tumble-behind-rogue", "feat:tumble-behind-swashbuckler"] },
            { or: ["check:outcome:critical-success", "check:outcome:success"] }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const effect = await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_ASSISTANT_EFFECTS["effect-tumble-behind"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll,
                    tokenMark: { slug: "tumble-behind", token: data.target.token }
                }
            );

            if (effect) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: effect });

            return reroll;
        }
    }
];
