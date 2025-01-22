import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Spells", "1st Rank", "Guidance"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: ["spell:guidance"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!data.item?.isOfType("spell")) return;

            const immunities = Utils.Actor.getEffects(data.target.actor, {
                slugs: ["effect-guidance-immunity"],
            });

            if (immunities.length !== 0) {
                ui.notifications.warn(`The target is temporarily immune to Guidance.`);
                return;
            }

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.spell-effects.Item.3qHKBDF7lrHw8jFK",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.spell-effects.Item.3LyOkV25p7wA181H",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
