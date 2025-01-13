import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "action",
        predicate: ["spell:guidance"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            if (
                message.target.actor.itemTypes.effect.some(
                    (effect) => effect.slug === "effect-guidance-immunity" && !effect.isExpired,
                )
            ) {
                ui.notifications.warn(`The target is temporarily immune to Guidance.`);
                return;
            }

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.spell-effects.Item.3qHKBDF7lrHw8jFK",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: message.item.attribute,
                                        mod: message.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: message.item.spellcasting?.tradition,
                                },
                                rollOptions: message.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.spell-effects.Item.3LyOkV25p7wA181H",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: message.item.attribute,
                                        mod: message.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: message.item.spellcasting?.tradition,
                                },
                                rollOptions: message.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
