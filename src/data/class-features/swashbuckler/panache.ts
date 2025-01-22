import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Class Features", "Swashbuckler", "Panache"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: [
            "item:trait:bravado",
            { not: "self:effect:panache" },
            { or: ["check:outcome:critical-success", "check:outcome:success"] },
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.feat-effects.Item.uBJsxCzNhje8m8jj",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target?.actor.uuid,
                                token: data.target?.token?.uuid ?? null,
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
    {
        trigger: "skill-check",
        predicate: ["item:trait:bravado", { not: "self:effect:panache" }, "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.AVzxZwYQ8XvuzxPj",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target?.actor.uuid,
                                token: data.target?.token?.uuid ?? null,
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
