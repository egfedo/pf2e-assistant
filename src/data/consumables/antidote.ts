import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Antidote"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:antidote-lesser",
                    "item:slug:antidote-moderate",
                    "item:slug:antidote-greater",
                    "item:slug:antidote-major"
                ]
            }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-antidote"],
                { origin: data.speaker, item: data.item, target: target }
            );
        }
    }
];
