import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "action",
        predicate: ["spell:light"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.spell-effects.Item.cVVZXNbV0nElVOPZ",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: message.item.attribute,
                                        mod: message.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: message.item.spellcasting?.tradition,
                                },
                                rollOptions: message.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                        level: {
                            value: message.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
