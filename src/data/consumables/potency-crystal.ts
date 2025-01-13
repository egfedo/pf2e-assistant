import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Consumables | Potency Crystal";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:potency-crystal"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.R5ugeFK3MPwkbv0s",
                {
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
                } as EffectSource,
            );
        },
    },
    {
        trigger: "consume",
        predicate: ["consumable:insight-coffee-greater"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.Acox3S5hpJAqq1jc",
                {
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
                } as EffectSource,
            );
        },
    },
    {
        trigger: "consume",
        predicate: ["consumable:insight-coffee-major"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.VMVrJA4SkyOfklmj",
                {
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
                } as EffectSource,
            );
        },
    },
];
