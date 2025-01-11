import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "attack-roll",
        predicate: [
            "item:ammo:slug:shining-ammunition",
            {
                or: ["check:outcome:critical-success", "check:outcome:success"],
            },
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.equipment-effects.Item.TjBxxlTvb6tJP1jS",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item?.uuid ?? null,
                                spellcasting: null,
                                rollOptions: message.item?.getOriginData().rollOptions ?? [],
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                total: message.checkRoll?.total,
                                degreeOfSuccess: message.checkRoll?.degreeOfSuccess,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
