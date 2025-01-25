import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Actions", "Bon Mot"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_FEAT_EFFECTS["effect-bon-mot"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (embeddedItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });

            const effects = Utils.Actor.getEffects(data.speaker.actor, ["effect-bon-mot"], {
                origin: data.speaker.actor,
                target: data.target.actor,
                degreeOfSuccess: 0
            });

            effects.forEach((effect) =>
                reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() })
            );

            effects.forEach(
                async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect)
            );

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEffect(
                data.target.actor,
                PF2E_FEAT_EFFECTS["effect-bon-mot"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (embeddedItem)
                reroll.removeItem.push({ actor: data.target.actor.uuid, item: embeddedItem });

            const effects = Utils.Actor.getEffects(data.speaker.actor, ["effect-bon-mot"], {
                origin: data.speaker.actor,
                target: data.target.actor,
                degreeOfSuccess: 0
            });

            effects.forEach((effect) =>
                reroll.addItem.push({ actor: effect.parent.uuid, item: effect.toObject() })
            );

            effects.forEach(
                async (effect) => await game.assistant.socket.deleteEmbeddedItem(effect)
            );

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:bon-mot", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            if (!Utils.Roll.isCheckRoll(data.roll)) return;
            const reroll = Assistant.createReroll();

            const embeddedItem = await game.assistant.socket.addEffect(
                data.speaker.actor,
                PF2E_FEAT_EFFECTS["effect-bon-mot"],
                {
                    origin: data.speaker,
                    target: data.target,
                    roll: data.roll
                }
            );

            if (embeddedItem)
                reroll.removeItem.push({ actor: data.speaker.actor.uuid, item: embeddedItem });

            return reroll;
        }
    }
];
