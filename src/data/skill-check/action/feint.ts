import { AssistantAction } from "action.ts";
import { EffectPF2e, EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:feint", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.TJzFIRf9S5P91qgf",
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
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
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
        predicate: ["action:feint", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.csAEJ72jCsHuHlLO",
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
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
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
        predicate: ["action:feint", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            let effect = await fromUuid<EffectPF2e>(
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.9f4YzsgcAs3A5Xra",
            );
            if (effect) {
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
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
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                });

                // @ts-expect-error
                effectSource.system.rules.find((value) => value.key === "TokenMark" && value.slug === "feint").uuid =
                    message.speaker.token?.uuid;

                game.assistant.socket.createEmbeddedItem(message.target.actor, effectSource);
            }
        },
    },
];
