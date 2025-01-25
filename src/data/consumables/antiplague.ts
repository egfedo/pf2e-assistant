import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Antiplague"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: [
                    "item:slug:antiplague-lesser",
                    "item:slug:antiplague-moderate",
                    "item:slug:antiplague-greater",
                    "item:slug:antiplague-major"
                ]
            }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-antiplague"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: target
                }
            );
        }
    }
];
