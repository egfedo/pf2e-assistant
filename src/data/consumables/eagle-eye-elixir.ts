import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Eagle Eye Elixir"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["item:slug:eagle-eye-elixir-lesser"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.VCypzSu659eC6jNi", {
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
    {
        trigger: "consume",
        predicate: ["item:slug:eagle-eye-elixir-moderate"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.Wa4317cqU4lJ8vAQ", {
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
    {
        trigger: "consume",
        predicate: ["item:slug:eagle-eye-elixir-greater"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.kgotU0sFmtAHYySB", {
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
    {
        trigger: "consume",
        predicate: ["item:slug:eagle-eye-elixir-major"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.wyLEew86nhNUXASu", {
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
