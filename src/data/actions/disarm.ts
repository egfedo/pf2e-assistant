import { Assistant } from "assistant.ts";

export const path = ["Actions", "Disarm"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e.other-effects.Item.PuDS0DEq0CnaSIFV",
            );

            if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.ec8ymUmUO58KmDLg",
            );

            if (embeddedItem) reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
];
