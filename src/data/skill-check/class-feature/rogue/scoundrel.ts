import { AssistantAction } from "action.ts";
import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:feint", "feature:scoundrel", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            const effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.9YHTscLqlt0zlTIk",
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
                            target: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                            },
                            roll: {
                                total: message.checkRoll?.total ?? undefined,
                                degreeOfSuccess: 2,
                            },
                        },
                    },
                });

                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
            }
        },
    },
];
