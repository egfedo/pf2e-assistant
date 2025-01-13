import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const label = "Class Features | Swashbuckler | Panache";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: [
            "item:trait:bravado",
            { not: "self:effect:panache" },
            { or: ["check:outcome:critical-success", "check:outcome:success"] },
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.feat-effects.Item.uBJsxCzNhje8m8jj",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: message.target?.actor.uuid,
                                token: message.target?.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "skill-check",
        predicate: ["item:trait:bravado", { not: "self:effect:panache" }, "check:outcome:failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.AVzxZwYQ8XvuzxPj",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: message.target?.actor.uuid,
                                token: message.target?.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
