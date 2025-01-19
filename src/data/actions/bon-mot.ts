import { AssistantAction } from "action.ts";
import { EffectSource } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const label = "Actions | Bon Mot";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
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

            message.speaker.actor.itemTypes.effect
                .filter(
                    (effect) =>
                        effect.slug === "effect-bon-mot" &&
                        effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                        effect.system.context?.target?.actor === message.target?.actor.uuid &&
                        effect.system.context?.roll?.degreeOfSuccess === 0,
                )
                .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                message.target.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
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

            message.speaker.actor.itemTypes.effect
                .filter(
                    (effect) =>
                        effect.slug === "effect-bon-mot" &&
                        effect.system.context?.origin.actor === message.speaker?.actor.uuid &&
                        effect.system.context?.target?.actor === message.target?.actor.uuid &&
                        effect.system.context?.roll?.degreeOfSuccess === 0,
                )
                .forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!Utils.Roll.isCheckRoll(message.roll)) return;

            game.assistant.socket.addEmbeddedItem(
                message.speaker.actor,
                "Compendium.pf2e.feat-effects.Item.GoSls6SKCFmSoDxT",
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
];
