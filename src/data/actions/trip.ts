import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Actions", "Trip"];

export const actions: Assistant.Action[] = [
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:critical-success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            const reroll = Assistant.createReroll();

            if (!data.target.actor.hasCondition("prone")) {
                await game.assistant.socket.toggleCondition(data.target.actor, "prone", {
                    active: true
                });
                reroll.removeCondition.push({ actor: data.target.actor.uuid, condition: "prone" });
            }

            const showBreakdown =
                game.pf2e.settings.metagame.breakdowns || !!data.speaker.actor.hasPlayerOwner;
            const roll = await Utils.Roll.newDamageRoll(
                "{1d6[bludgeoning]}",
                {},
                { showBreakdown }
            ).evaluate();
            const createdMessage = await roll.toMessage({
                flags: { "pf2e-assistant": { process: false } },
                speaker: ChatMessage.getSpeaker({
                    actor: data.speaker.actor,
                    token: data.speaker.token
                })
            });
            reroll.deleteChatMessage.push(createdMessage.uuid);

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:success"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            const reroll = Assistant.createReroll();

            if (!data.target.actor.hasCondition("prone")) {
                await game.assistant.socket.toggleCondition(data.target.actor, "prone", {
                    active: true
                });
                reroll.removeCondition.push({ actor: data.target.actor.uuid, condition: "prone" });
            }

            return reroll;
        }
    },
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:critical-failure"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.target) return;
            const reroll = Assistant.createReroll();

            if (!data.speaker.actor.hasCondition("prone")) {
                await game.assistant.socket.toggleCondition(data.speaker.actor, "prone", {
                    active: true
                });
                reroll.removeCondition.push({ actor: data.target.actor.uuid, condition: "prone" });
            }

            return reroll;
        }
    }
];
