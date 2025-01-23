import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

import { Utils } from "utils.ts";

export const path = ["Consumables", "Shining Ammunition"];

export const actions: Assistant.Action[] = [
    {
        trigger: "attack-roll",
        predicate: [
            "item:ammo:slug:shining-ammunition",
            {
                or: ["check:outcome:critical-success", "check:outcome:success"],
            },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.equipment-effects.Item.TjBxxlTvb6tJP1jS",
                {
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
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
                            },
                            roll: {
                                total: data.roll?.total,
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
