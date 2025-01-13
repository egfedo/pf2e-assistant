import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const label = "Consumables | Shielding Salve";

export const actions: AssistantAction[] = [
    {
        trigger: "consume",
        predicate: ["consumable:shielding-salve"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            const target = message.target?.actor ?? message.speaker.actor;

            game.assistant.socket.addEmbeddedItem(target, "Compendium.pf2e.equipment-effects.Item.16tOZk4qy329s2aK", {
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
            } as EffectSource);
        },
    },
];
