import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Chromatic Jellyfish Oil"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:chromatic-jellyfish-oil-lesser",
                    "item:slug:chromatic-jellyfish-oil-moderate",
                    "item:slug:chromatic-jellyfish-oil-greater"
                ]
            }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-chromatic-jellyfish-oil"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: target
                }
            );
        }
    }
];
