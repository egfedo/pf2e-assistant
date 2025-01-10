import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.other-effects.Item.PuDS0DEq0CnaSIFV",
            );
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:disarm", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.ec8ymUmUO58KmDLg",
            );
        },
    },
];
