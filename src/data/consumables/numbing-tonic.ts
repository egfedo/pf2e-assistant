import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Numbing Tonic"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:numbing-tonic-minor",
                    "item:slug:numbing-tonic-lesser",
                    "item:slug:numbing-tonic-moderate",
                    "item:slug:numbing-tonic-greater",
                    "item:slug:numbing-tonic-major",
                    "item:slug:numbing-tonic-true"
                ]
            }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-numbing-tonic"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: target
                }
            );
        }
    }
];
