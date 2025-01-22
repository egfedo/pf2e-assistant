import { Assistant } from "assistant.ts";
import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Actions", "Feint"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:feint", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.TJzFIRf9S5P91qgf",
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

            if (embeddedItem) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:feint", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.csAEJ72jCsHuHlLO",
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

            if (embeddedItem) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:feint", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            let effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.9f4YzsgcAs3A5Xra",
            );

            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
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
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                });

                // @ts-expect-error
                effectSource.system.rules.find((value) => value.key === "TokenMark" && value.slug === "feint").uuid =
                    data.speaker.token?.uuid;

                const embeddedItem = await game.assistant.socket.createEmbeddedItem(data.target.actor, effectSource);
                if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });
            }

            return reroll;
        },
    },
];
