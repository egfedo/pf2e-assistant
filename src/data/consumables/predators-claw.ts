import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Consumables | Predator's Claw";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:predators-claw"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.equipment-effects.Item.Vvl1GFfuvFzvOkbD",
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
                            target: null,
                            roll: null,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
