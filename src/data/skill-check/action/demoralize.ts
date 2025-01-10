import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

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

            const frightened = message.target.actor.getCondition("frightened");
            const value = frightened?.value ?? 0;
            if (value < 2) {
                await game.assistant.socket.increaseCondition(message.target.actor, "frightened", { max: 2, value: 2 });
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
                                degreeOfSuccess: message.checkRoll?.degreeOfSuccess,
                                total: message.checkRoll?.total ?? null,
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

            const frightened = message.target.actor.getCondition("frightened");
            const value = frightened?.value ?? 0;
            if (value < 1) {
                await game.assistant.socket.increaseCondition(message.target.actor, "frightened", { max: 1, value: 1 });
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
                                degreeOfSuccess: message.checkRoll?.degreeOfSuccess,
                                total: message.checkRoll?.total ?? null,
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
                                degreeOfSuccess: message.checkRoll?.degreeOfSuccess,
                                total: message.checkRoll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
