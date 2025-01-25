import { Assistant } from "assistant.ts";

export const path = ["Consumables", "Potency Crystal"];

export const actions: Assistant.Action[] = [
    {
        trigger: "consume",
        predicate: ["item:slug:potency-crystal"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-potency-crystal"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: data.speaker
                }
            );
        }
    },
    {
        trigger: "consume",
        predicate: ["item:slug:potency-crystal-greater"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-potency-crystal-greater"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: data.speaker
                }
            );
        }
    },
    {
        trigger: "consume",
        predicate: ["item:slug:potency-crystal-major"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_EQUIPMENT_EFFECTS["effect-potency-crystal-major"],
                {
                    origin: data.speaker,
                    item: data.item,
                    target: data.speaker
                }
            );
        }
    }
];
