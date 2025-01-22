import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
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

            const immunity = Utils.Actor.getEffects(data.target.actor, {
                slugs: ["effect-demoralize-immunity"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
            });

            if (immunity.length !== 0) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${data.speaker.actor.name}.`,
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !data.target.actor.traits.has("mindless") &&
                !data.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                const currentValue = await game.assistant.socket.setCondition(data.target.actor, "frightened", 2);
                if (currentValue) reroll.setCondition.push({ actor: data.target.actor.uuid, condition: "frightened", value: currentValue });
            }

            const createdItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );

            if (createdItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: createdItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;

            const immunity = Utils.Actor.getEffects(data.target.actor, {
                slugs: ["effect-demoralize-immunity"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
            });

            if (immunity.length !== 0) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${data.speaker.actor.name}.`,
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !data.target.actor.traits.has("mindless") &&
                !data.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                await game.assistant.socket.setCondition(data.target.actor, "frightened", 1);
            }

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", { or: ["check:outcome:failure", "check:outcome:critical-failure"] }],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
