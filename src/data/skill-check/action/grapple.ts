import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.target.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/conditions/restrained.webp",
                name: "Effect: Grapple (Critical Success)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "You are restrained until the end of the target's next turn unless they move or you @UUID[Compendium.pf2e.actionspf2e.Item.SkZAQRkLLkmBQNB9]{Escape}.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "GrantItem",
                            // @ts-expect-error
                            onDeleteActions: {
                                grantee: "restrict",
                            },
                            uuid: "Compendium.pf2e.conditionitems.Item.VcDeM8A5oI6VqhbM",
                        },
                    ],
                    slug: "effect-grapple-critical-success"
                },
            });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.target.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/conditions/grabbed.webp",
                name: "Effect: Grapple (Success)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "You are grabbed until the end of the target's next turn unless they move or you @UUID[Compendium.pf2e.actionspf2e.Item.SkZAQRkLLkmBQNB9]{Escape}.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "GrantItem",
                            // @ts-expect-error
                            onDeleteActions: {
                                grantee: "restrict",
                            },
                            uuid: "Compendium.pf2e.conditionitems.Item.kWc1fhmv9LBiTuei",
                        },
                    ],
                    slug: "effect-grapple-success"
                },
            });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            message.target.actor.itemTypes.effect
                .filter((effect) => effect.slug === "effect-grapple-critical-success" && effect.system.context?.origin.actor === message.speaker?.actor.uuid)
                .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));

            message.target.actor.itemTypes.effect
                .filter((effect) => effect.slug === "effect-grapple-success" && effect.system.context?.origin.actor === message.speaker?.actor.uuid)
                .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
        },
    },
];
