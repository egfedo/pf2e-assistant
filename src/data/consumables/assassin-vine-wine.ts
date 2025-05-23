import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Assassin Vine Wine"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consumable",
        predicate: [{ or: ["item:assassin-vine-wine", "item:aged-assassin-vine-wine"] }],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(target.actor, PF2E_EQUIPMENT_EFFECTS["effect-assassin-vine-wine"], {
                origin: data.speaker,
                item: data.item,
                target: target
            });
        }
    }
];
