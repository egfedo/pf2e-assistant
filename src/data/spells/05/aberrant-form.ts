import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Spells | 5th Rank | Aberrant Form";

export const actions: AssistantAction[] = [
    {
        trigger: "action",
        predicate: ["spell:aberrant-form"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.promptChoice(message.speaker.actor, {
                speaker: message.speaker,
                item: message.item,
                data: {
                    description: "Please choose which form that I should transform into.",
                    choices: [
                        {
                            label: "Chuul",
                            value: "aberrant-form-chuul",
                        },
                        {
                            label: "Gogiteth",
                            value: "aberrant-form-gogiteth",
                        },
                        {
                            label: "Gug",
                            value: "aberrant-form-gug",
                        },
                        {
                            label: "Otyugh",
                            value: "aberrant-form-otyugh",
                        },
                    ],
                },
            });
        },
    },
    {
        trigger: "choice",
        predicate: ["spell:aberrant-form", "choice:aberrant-form-chuul"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.xsy1yaCj0SVsn502",
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
                                rollOptions: message.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "choice",
        predicate: ["spell:aberrant-form", "choice:aberrant-form-gogiteth"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.gKGErrsS1WoAyWub",
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
                                rollOptions: message.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "choice",
        predicate: ["spell:aberrant-form", "choice:aberrant-form-gug"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.sfJyQKmoxSRo6FyP",
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
                                rollOptions: message.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "choice",
        predicate: ["spell:aberrant-form", "choice:aberrant-form-otyugh"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.SjfDoeymtnYKoGUD",
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
                                rollOptions: message.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
