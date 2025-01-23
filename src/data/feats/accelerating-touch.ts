import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Feats", "Accelerating Touch"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: [
            "item:slug:lay-on-hands",
            "feat:accelerating-touch",
            { "not": "target:mode:undead" },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.item?.isOfType("spell")) return;
            if (!data.speaker) return;
            if (!data.target) return;

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.spell-effects.Item.alyNtkHLNnt98Ewz",
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
                                rollOptions: data.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
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
