import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Mistform Elixir"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["consumable:mistform-elixir-lesser"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(
                target,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.SZfUd4SIABrmaZ4T",
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
        predicate: ["consumable:mistform-elixir-moderate"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(
                target,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.qakQkye2t3b8ELPq",
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
        predicate: ["consumable:mistform-elixir-greater"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(
                target,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.2bApaOOOWXqQAgy2",
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
