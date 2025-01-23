import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Actions", "Bon Mot"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
            if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });

            const effects = Utils.Actor.getEffects(data.speaker.actor, {
                slugs: ["effect-bon-mot"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
                degreeOfSuccess: 0,
            });
            effects.forEach((effect) => reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() }));
            effects.forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));

            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
            if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });

            const effects = Utils.Actor.getEffects(data.speaker.actor, {
                slugs: ["effect-bon-mot"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
                degreeOfSuccess: 0,
            });
            effects.forEach((effect) => reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() }));
            effects.forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));

            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
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
];
