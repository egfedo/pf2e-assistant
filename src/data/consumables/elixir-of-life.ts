import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Elixir of Life"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:elixir-of-life-minor",
                    "item:slug:elixir-of-life-lesser",
                    "item:slug:elixir-of-life-moderate",
                    "item:slug:elixir-of-life-greater",
                    "item:slug:elixir-of-life-major",
                    "item:slug:elixir-of-life-true",
                ],
            },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.lPRuIRbu0rHBkoKY", {
                _id: null,
                system: {
                    context: {
                        origin: {
                            actor: data.speaker.actor.uuid,
                            token: data.speaker.token.uuid,
                            item: data.item?.uuid ?? null,
                            spellcasting: null,
                            rollOptions: data.item?.getOriginData().rollOptions ?? [],
                        },
                        target: null,
                        roll: null,
                    },
                },
            } as EffectSource);
        },
    },
];
