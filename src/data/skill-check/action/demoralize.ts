import { AssistantAction } from "action.ts";
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

            await game.assistant.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/intimidation-impressing.webp",
                name: `Effect: Demoralize Immunity`,
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
                            total: message.checkRoll?.total,
                            degreeOfSuccess: 3,
                        },
                    },
                    description: {
                        value: "You are temporarily immune to further attempts to @UUID[Compendium.pf2e.actionspf2e.Item.2u915NdUyQan6uKF]{Demoralize} for 10 minutes.",
                    },
                    duration: {
                        expiry: "turn-start",
                        unit: "minutes",
                        value: 10,
                    },
                    slug: "effect-demoralize-immunity",
                },
            });
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

            await game.assistant.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/intimidation-impressing.webp",
                name: `Effect: Demoralize Immunity`,
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
                            total: message.checkRoll?.total,
                            degreeOfSuccess: 3,
                        },
                    },
                    description: {
                        value: "You are temporarily immune to further attempts to @UUID[Compendium.pf2e.actionspf2e.Item.2u915NdUyQan6uKF]{Demoralize} for 10 minutes.",
                    },
                    duration: {
                        expiry: "turn-start",
                        unit: "minutes",
                        value: 10,
                    },
                    slug: "effect-demoralize-immunity",
                },
            });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:demoralize", { or: ["check:outcome:failure", "check:outcome:critical-failure"] }],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            await game.assistant.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/intimidation-impressing.webp",
                name: `Effect: Demoralize Immunity`,
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
                            total: message.checkRoll?.total,
                            degreeOfSuccess: 3,
                        },
                    },
                    description: {
                        value: "You are temporarily immune to further attempts to @UUID[Compendium.pf2e.actionspf2e.Item.2u915NdUyQan6uKF]{Demoralize} for 10 minutes.",
                    },
                    duration: {
                        expiry: "turn-start",
                        unit: "minutes",
                        value: 10,
                    },
                    slug: "effect-demoralize-immunity",
                },
            });
        },
    },
];
