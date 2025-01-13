import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:sword"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.pnrI5GLh87DikArY",
                {
                    _id: null,
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
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
];
