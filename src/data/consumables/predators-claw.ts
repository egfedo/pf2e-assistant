import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Predator's Claw"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["consumable:predators-claw"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.Vvl1GFfuvFzvOkbD",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: data.item?.uuid ?? null,
                                spellcasting: null,
                                rollOptions: data.item?.getOriginData().rollOptions ?? [],
                            },
                            target: null,
                            roll: null,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
