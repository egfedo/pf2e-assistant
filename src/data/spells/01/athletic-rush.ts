import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Spells", "1st Rank", "Athletic Rush"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: ["item:slug:athletic-rush"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.57lnrCzGUcNUBP2O",
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
];
