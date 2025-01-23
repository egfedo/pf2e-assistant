import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Spells", "3rd Rank", "Angelic Wings"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: [
            "item:slug:angelic-wings",
            { "lt": ["item:rank", 5] }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.iZYjxY0qYvg5yPP3",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid
                            },
                            roll: null,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "action",
        predicate: [
            "item:slug:angelic-wings",
            { "gte": ["item:rank", 5] }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.iZYjxY0qYvg5yPP3",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid
                            },
                            roll: null,
                        },
                        duration: {
                            unit: "minutes",
                            value: 1,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
