import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Actions", "Disarm"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_OTHER_EFFECTS["effect-disarm-success"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (embeddedItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_ASSISTANT_EFFECTS["effect-disarm-critical-failure"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (embeddedItem)
                reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });

            return reroll;
        }
    }
];
