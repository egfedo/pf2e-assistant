import { Assistant } from "assistant.ts";

export const path = ["Spells", "3rd Rank", "Heroism"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: ["item:heroism"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;
            const target = data.target ?? data.speaker;

            await game.assistant.socket.addEffect(
                target.actor,
                PF2E_SPELL_EFFECTS["spell-effect-heroism"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: target
                }
            );
        }
    }
];
