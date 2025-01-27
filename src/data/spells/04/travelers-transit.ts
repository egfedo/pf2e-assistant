import { Assistant } from "assistant.ts";

export const path = ["Spells", "4th Rank", "Traveler's Transit"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: ["item:travelers-transit"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-travelers-transit"],
                { origin: data.speaker, item: data.item, target: data.speaker }
            );
        }
    }
];
