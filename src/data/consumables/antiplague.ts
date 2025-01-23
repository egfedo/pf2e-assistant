import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Antiplague"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:antiplague-lesser",
                    "item:slug:antiplague-moderate",
                    "item:slug:antiplague-greater",
                    "item:slug:antiplague-major",
                ],
            },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-srd.Item.UqinuuCWePTYGhVO", {
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
