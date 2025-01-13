import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Consumables | War Blood Mutagen";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:war-blood-mutagen-lesser"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.aIZsC56OdotiGb9M", {
                _id: null,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                            rollOptions: message.item?.getOriginData().rollOptions ?? [],
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
        predicate: ["consumable:war-blood-mutagen-moderate"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.AvXNZ9I6s1H8C4wd", {
                _id: null,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                            rollOptions: message.item?.getOriginData().rollOptions ?? [],
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
        predicate: ["consumable:war-blood-mutagen-greater"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.8RNPIAuV7ixaXeq5", {
                _id: null,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                            rollOptions: message.item?.getOriginData().rollOptions ?? [],
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
        predicate: ["consumable:war-blood-mutagen-major"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.S3Sv7SYwxozbG554", {
                _id: null,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                            rollOptions: message.item?.getOriginData().rollOptions ?? [],
                        },
                        target: null,
                        roll: null,
                    },
                },
            } as EffectSource);
        },
    },
];
