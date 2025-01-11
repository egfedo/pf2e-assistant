import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:sanguine-mutagen-lesser"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.5VI5NCEhuorERXTi", {
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
        predicate: ["consumable:sanguine-mutagen-moderate"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.sZPXKQACna6YDsVX", {
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
        predicate: ["consumable:sanguine-mutagen-greater"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.FtBfE4yrbg9fxtxr", {
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
        predicate: ["consumable:sanguine-mutagen-major"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.yY8vPNmDdQQ5d7n6", {
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
