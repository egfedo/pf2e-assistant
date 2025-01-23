import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Feats", "Tumble Behind"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: [
            "action:tumble-through",
            { or: ["feat:tumble-behind-rogue", "feat:tumble-behind-swashbuckler"] },
            { or: ["check:outcome:critical-success", "check:outcome:success"] },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.aUzN2fOd33tZXa5s",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token.uuid,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
            if (embeddedItem) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });

            return reroll;
        },
    },
];
