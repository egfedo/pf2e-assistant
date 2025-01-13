import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.d9zE07hIacDCHuPw",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.ptAsHbG8GbO1o8Wx",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: message.target.actor.uuid,
                                token: message.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: message.roll?.degreeOfSuccess,
                                total: message.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.isInstanceOf(message.roll, "CheckRoll")) return;

            message.target.actor.itemTypes.effect
                .filter(
                    (effect) =>
                        effect.slug?.startsWith("effect-grapple") &&
                        effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                        effect.system.context?.target?.actor === message.target?.actor.uuid,
                )
                .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
        },
    },
];
