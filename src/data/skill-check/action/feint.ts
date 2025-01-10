import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:feint", { "not": "feature:scoundrel" }, "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.speaker.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
                name: "Effect: Feint (Critical Success)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "You throw your enemy's defenses against you entirely off. The target is @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Off-Guard} against melee attacks that you attempt against it until the end of your next turn.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "TokenMark",
                            slug: "feint",
                            // @ts-expect-error
                            uuid: message.target.token?.uuid ?? null,
                        },
                        {
                            key: "EphemeralEffect",
                            predicate: [
                                "target:mark:feint"
                            ],
                            // @ts-expect-error
                            selectors: [
                                "melee-attack-roll"
                            ],
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
                        }
                    ],
                    slug: "effect-feint-critical-success"
                },
            });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:feint", { "not": "feature:scoundrel" }, "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.speaker.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
                name: "Effect: Feint (Success)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "Your foe is fooled, but only momentarily. The target is @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Off-Guard} against the next melee attack that you attempt against it before the end of your current turn.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 0,
                    },
                    rules: [
                        {
                            key: "TokenMark",
                            slug: "feint",
                            // @ts-expect-error
                            uuid: message.target.token?.uuid ?? null,
                        },
                        {
                            key: "EphemeralEffect",
                            predicate: [
                                "target:mark:feint"
                            ],
                            // @ts-expect-error
                            selectors: [
                                "melee-attack-roll"
                            ],
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
                        }
                    ],
                    slug: "effect-feint-success"
                },
            });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:feint", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.target.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/social/theft-pickpocket-bribery-brown.webp",
                name: "Effect: Feint (Critical Failure)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "Their feint backfires. They are @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Off-Guard} against melee attacks that you attempt against them until the end of their next turn.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "TokenMark",
                            slug: "feint",
                            // @ts-expect-error
                            uuid: message.speaker.token?.uuid ?? null,
                        },
                        {
                            key: "EphemeralEffect",
                            predicate: [
                                "target:mark:feint"
                            ],
                            // @ts-expect-error
                            selectors: [
                                "melee-attack-roll"
                            ],
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
                        }
                    ],
                    slug: "effect-feint-critical-failure"
                },
            });
        },
    },
];
