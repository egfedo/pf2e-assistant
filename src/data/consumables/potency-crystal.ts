import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Potency Crystal"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["consumable:potency-crystal"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.R5ugeFK3MPwkbv0s",
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
    {
        trigger: "consume",
        predicate: ["consumable:insight-coffee-greater"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.Acox3S5hpJAqq1jc",
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
    {
        trigger: "consume",
        predicate: ["consumable:insight-coffee-major"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.VMVrJA4SkyOfklmj",
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
