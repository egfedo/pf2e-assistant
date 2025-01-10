import { AssistantAction } from "action.ts";
import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:mistform-elixir-lesser"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            const effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.SZfUd4SIABrmaZ4T",
            );

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
                            target: null,
                            roll: null,
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
            }
        },
    },
    {
        trigger: "consume",
        predicate: ["consumable:mistform-elixir-moderate"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            const effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.qakQkye2t3b8ELPq",
            );

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
                            target: null,
                            roll: null,
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
            }
        },
    },
    {
        trigger: "consume",
        predicate: ["consumable:mistform-elixir-greater"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            const effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.2bApaOOOWXqQAgy2",
            );

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
                            target: null,
                            roll: null,
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
            }
        },
    },
];
