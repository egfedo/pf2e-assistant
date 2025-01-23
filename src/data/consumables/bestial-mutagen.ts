import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";

export const path = ["Consumables", "Bestial Mutagen"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["item:slug:bestial-mutagen-lesser"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.fIpzDpuwLdIS4tW5", {
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
        predicate: ["item:slug:bestial-mutagen-moderate"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.xFQRiVU6h8EA6Lw9", {
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
        predicate: ["item:slug:bestial-mutagen-greater"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.kwD0wuW5Ndkc9YXB", {
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
        predicate: ["item:slug:bestial-mutagen-major"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target?.actor ?? data.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.1ouUo8lLK6H79Rqh", {
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
