import { EffectPF2e } from "foundry-pf2e";
import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            let effect = await fromUuid<EffectPF2e>("Compendium.pf2e.other-effects.Item.PuDS0DEq0CnaSIFV");
            if (effect) game.assistant.socket.createEmbeddedItem(message.target.actor, effect.toObject());
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            await game.assistant.socket.createEmbeddedItem(message.speaker.actor, {
                _id: null,
                type: "effect",
                img: "icons/skills/melee/unarmed-punch-fist-white.webp",
                name: "Effect: Disarm (Critical Failure)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        }
                    },
                    description: {
                        value: "You lose your balance and become @UUID[Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg]{Off-Guard} until the start of your next turn.",
                    },
                    duration: {
                        expiry: "turn-start",
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
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg",
                        },
                    ],
                },
            });
        },
    },
];
