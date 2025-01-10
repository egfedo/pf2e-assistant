import { AssistantAction } from "action.ts";
import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "consumable:elixir-of-life-minor",
                    "consumable:elixir-of-life-lesser",
                    "consumable:elixir-of-life-moderate",
                    "consumable:elixir-of-life-greater",
                    "consumable:elixir-of-life-major",
                    "consumable:elixir-of-life-true",
                ],
            },
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            const effect = await fromUuid<EffectPF2e>("Compendium.pf2e.equipment-effects.Item.lPRuIRbu0rHBkoKY");

            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item?.uuid ?? null,
                                spellcasting: null,
                                rollOptions: message.item?.getOriginData().rollOptions ?? [],
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
