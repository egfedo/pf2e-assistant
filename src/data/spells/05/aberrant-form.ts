import { Assistant } from "assistant.ts";

export const path = ["Spells", "5th Rank", "Aberrant Form"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: ["item:aberrant-form"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            game.assistant.socket.promptChoice(data.speaker.actor, {
                speaker: data.speaker,
                item: data.item,
                data: {
                    description: "Please choose which form that I should transform into.",
                    choices: [
                        {
                            label: "Chuul",
                            value: "aberrant-form-chuul"
                        },
                        {
                            label: "Gogiteth",
                            value: "aberrant-form-gogiteth"
                        },
                        {
                            label: "Gug",
                            value: "aberrant-form-gug"
                        },
                        {
                            label: "Otyugh",
                            value: "aberrant-form-otyugh"
                        }
                    ]
                }
            });
        }
    },
    {
        trigger: "choice",
        predicate: ["item:aberrant-form", "choice:aberrant-form-chuul"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-aberrant-form-chuul"],
                { origin: data.speaker, item: data.item, target: data.speaker }
            );
        }
    },
    {
        trigger: "choice",
        predicate: ["item:aberrant-form", "choice:aberrant-form-gogiteth"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-aberrant-form-gogiteth"],
                { origin: data.speaker, item: data.item, target: data.speaker }
            );
        }
    },
    {
        trigger: "choice",
        predicate: ["item:aberrant-form", "choice:aberrant-form-gug"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-aberrant-form-gug"],
                { origin: data.speaker, item: data.item, target: data.speaker }
            );
        }
    },
    {
        trigger: "choice",
        predicate: ["item:aberrant-form", "choice:aberrant-form-otyugh"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_SPELL_EFFECTS["spell-effect-aberrant-form-otyugh"],
                { origin: data.speaker, item: data.item, target: data.speaker }
            );
        }
    }
];
