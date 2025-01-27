import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Actions", "Demoralize"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            if (
                Utils.Actor.hasEffect(data.target.actor, "effect-demoralize-immunity", {
                    origin: data.speaker.actor
                })
            ) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${data.speaker.actor.name}.`
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !data.target.actor.traits.has("mindless") &&
                !data.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                const currentValue = await game.assistant.socket.setCondition(
                    data.target.actor,
                    "frightened",
                    2
                );
                if (currentValue)
                    reroll.setCondition.push({
                        actor: data.target.actor.uuid,
                        condition: "frightened",
                        value: currentValue
                    });
            }

            const createdItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_ASSISTANT_EFFECTS["effect-demoralize-immunity"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (createdItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: createdItem });

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            if (
                Utils.Actor.hasEffect(data.target.actor, "effect-demoralize-immunity", {
                    origin: data.speaker.actor
                })
            ) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${data.speaker.actor.name}.`
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !data.target.actor.traits.has("mindless") &&
                !data.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                const currentValue = await game.assistant.socket.setCondition(
                    data.target.actor,
                    "frightened",
                    1
                );
                if (currentValue)
                    reroll.setCondition.push({
                        actor: data.target.actor.uuid,
                        condition: "frightened",
                        value: currentValue
                    });
            }

            const createdItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_ASSISTANT_EFFECTS["effect-demoralize-immunity"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (createdItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: createdItem });

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: [
            "action:demoralize",
            { or: ["check:outcome:failure", "check:outcome:critical-failure"] }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const createdItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_ASSISTANT_EFFECTS["effect-demoralize-immunity"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (createdItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: createdItem });

            return reroll;
        }
    }
];
