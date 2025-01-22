import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Actions", "Grapple"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.d9zE07hIacDCHuPw",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );

            if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.ptAsHbG8GbO1o8Wx",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: data.roll?.degreeOfSuccess,
                                total: data.roll?.total ?? null,
                            },
                        },
                    },
                } as EffectSource,
            );

            if (embeddedItem) reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });
            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const effects = Utils.Actor.getEffects(data.target.actor, {
                slugs: ["effect-grapple-critical-success", "effect-grapple-success"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
            });

            effects.forEach((effect) => reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() }));
            effects.forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));

            return reroll;
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:grapple", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const effects = Utils.Actor.getEffects(data.target.actor, {
                slugs: ["effect-grapple-critical-success", "effect-grapple-success"],
                origin: data.speaker.actor.uuid,
                target: data.target.actor.uuid,
            });

            effects.forEach((effect) => reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() }));
            effects.forEach(async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect));

            const createdPrompt = await game.assistant.socket.promptChoice(data.target.actor, {
                speaker: { actor: data.target.actor, token: data.target.token },
                target: { actor: data.speaker.actor, token: data.speaker.token },
                data: {
                    description: "My foe has critically failed to grapple me, what should I do?",
                    choices: [
                        {
                            label: "Grab Foe",
                            value: "grapple-foe",
                        },
                        {
                            label: "Force Foe Prone",
                            value: "prone-foe",
                        },
                    ],
                },
            });
            if (createdPrompt) reroll.deleteChatMessage.push(createdPrompt);

            return reroll;
        },
    },
    {
        trigger: "choice",
        predicate: ["choice:grapple-foe"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;

            game.assistant.socket.addEmbeddedItem(
                data.target.actor,
                "Compendium.pf2e-assistant.pf2e-assistant-effects.Item.ptAsHbG8GbO1o8Wx",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token?.uuid ?? null,
                                item: null,
                                spellcasting: null,
                            },
                            target: {
                                actor: data.target.actor.uuid,
                                token: data.target.token?.uuid ?? null,
                            },
                            roll: {
                                degreeOfSuccess: 2,
                            },
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "choice",
        predicate: ["choice:prone-foe"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;

            game.assistant.socket.toggleCondition(data.target.actor, "prone", { active: true });
        },
    },
];
