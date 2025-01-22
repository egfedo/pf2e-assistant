import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Critical Specializations", "Brawling"];

export const actions: Assistant.Action[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:brawling"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;

            game.assistant.socket.rollSave(data.target.actor, "fortitude", {
                origin: data.speaker.actor,
                dc: Utils.Actor.getClassDC(data.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:brawling"],
            });
        },
    },
    {
        trigger: "saving-throw",
        predicate: [
            { or: ["check:outcome:failure", "check:outcome:critical-failure"] },
            "critical-specialization",
            "item:group:brawling",
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.origin) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.iSaDovIXZCJNPOOj",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.origin.actor.uuid,
                                token: data.origin.token.uuid,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
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
