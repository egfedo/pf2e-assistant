import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Consumables | Eagle Eye Elixir";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:eagle-eye-elixir-lesser"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.VCypzSu659eC6jNi", {
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
        predicate: ["consumable:eagle-eye-elixir-moderate"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.Wa4317cqU4lJ8vAQ", {
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
        predicate: ["consumable:eagle-eye-elixir-greater"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.kgotU0sFmtAHYySB", {
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
        predicate: ["consumable:eagle-eye-elixir-major"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.wyLEew86nhNUXASu", {
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
