import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Bomber's Eye Elixir"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: [
            {
                or: ["item:bombers-eye-elixir-lesser", "item:bombers-eye-elixir-greater"]
            }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-bombers-eye-elixir"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: target
                }
            );
        }
    }
];
