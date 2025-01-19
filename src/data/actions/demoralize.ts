import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const label = "Actions | Demoralize";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            const immunity = message.target.actor.itemTypes.effect.find(
                (effect) =>
                    effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                    effect.system.context?.target?.actor === message.target?.actor.uuid &&
                    effect.system.slug === "effect-demoralize-immunity" &&
                    !effect.isExpired,
            );

            if (immunity) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${message.speaker.actor.name}.`,
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !message.target.actor.traits.has("mindless") &&
                !message.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                await game.assistant.socket.setCondition(message.target.actor, "frightened", 2);
            }

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
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
        predicate: ["action:demoralize", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            const immunity = message.target.actor.itemTypes.effect.find(
                (effect) =>
                    effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                    effect.system.context?.target?.actor === message.target?.actor.uuid &&
                    effect.system.slug === "effect-demoralize-immunity" &&
                    !effect.isExpired,
            );

            if (immunity) {
                ui.notifications.warn(
                    `The target is temporarily immune to further attempts to Demoralize from ${message.speaker.actor.name}.`,
                );
                return;
            }

            // Check Mindless & Mental Immunity
            if (
                !message.target.actor.traits.has("mindless") &&
                !message.target.actor.attributes.immunities.some((i) => i.type === "mental")
            ) {
                await game.assistant.socket.setCondition(message.target.actor, "frightened", 1);
            }

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
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
        predicate: ["action:demoralize", { or: ["check:outcome:failure", "check:outcome:critical-failure"] }],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.1Yt5WmhS76y4hibk",
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
];
