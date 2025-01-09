import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: [
            "action:tumble-through",
            { or: ["feat:tumble-behind-rogue", "feat:tumble-behind-swashbuckler"] },
            { or: ["check:outcome:critical-success", "check:outcome:success"] },
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.speaker.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/movement/figure-running-gray.webp",
                name: "Effect: Tumble Behind",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "Your foe is @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Off-Guard} against the next attack you make before the end of your turn.",
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 0,
                    },
                    rules: [
                        {
                            key: "TokenMark",
                            slug: "tumble-behind",
                            // @ts-expect-error
                            uuid: message.target.token?.uuid ?? null,
                        },
                        {
                            key: "EphemeralEffect",
                            predicate: [
                                "target:mark:tumble-behind"
                            ],
                            // @ts-expect-error
                            selectors: [
                                "attack-roll"
                            ],
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg"
                        }
                    ],
                    slug: "effect-tumble-behind"
                },
            });
        },
    },
];
