import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const effect = await fromUuid<EffectPF2e>("Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT");
            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                                rollOptions: [],
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: 3,
                                total: message.checkRoll?.total ?? null,
                            },
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.target.actor, effectSource);

                message.speaker.actor.itemTypes.effect
                    .filter(
                        (effect) =>
                            effect.slug === "effect-bon-mot" &&
                            effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                            effect.system.context?.target?.actor === message.target?.actor.uuid &&
                            effect.system.context?.roll?.degreeOfSuccess === 0,
                    )
                    .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
            }
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const effect = await fromUuid<EffectPF2e>("Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT");
            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                                rollOptions: [],
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: 2,
                                total: message.checkRoll?.total ?? null,
                            },
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.target.actor, effectSource);

                message.speaker.actor.itemTypes.effect
                    .filter(
                        (effect) =>
                            effect.slug === "effect-bon-mot" &&
                            effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                            effect.system.context?.target?.actor === message.target?.actor.uuid &&
                            effect.system.context?.roll?.degreeOfSuccess === 0,
                    )
                    .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
            }
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const effect = await fromUuid<EffectPF2e>("Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT");
            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                                rollOptions: [],
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: 0,
                                total: message.checkRoll?.total ?? null,
                            },
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
            }
        },
    },
];
