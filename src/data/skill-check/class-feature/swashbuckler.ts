import { EffectPF2e } from "foundry-pf2e";
import { AssistantAction } from "../../../action.ts";
import { AssistantMessage } from "../../../message.ts";

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

            let effect = (await fromUuid("Compendium.pf2e.feat-effects.Item.uBJsxCzNhje8m8jj")) as EffectPF2e;
            game.assistant.socket.createEmbeddedItem(message.speaker.actor, effect.toObject());
        },
    },
    {
        trigger: "skill-check",
        predicate: ["item:trait:bravado", { not: "self:effect:panache" }, "check:outcome:failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            game.assistant.socket.createEmbeddedItem(message.speaker.actor, {
                _id: null,
                type: "effect",
                img: "icons/commodities/treasure/crown-gold-laurel-wreath.webp",
                name: "Effect: Panache (1 Round)",
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                    },
                    description: {
                        value: "You gain panache until the end of your next turn.",
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
                            uuid: "Compendium.pf2e.feat-effects.Item.uBJsxCzNhje8m8jj",
                        },
                    ],
                },
            });
        },
    },
];
