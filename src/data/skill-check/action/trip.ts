import { AssistantAction } from "action.ts";
import { DamageDamageContextFlag } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:critical-success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.toggleCondition(message.target.actor, "prone", { active: true });

            const showBreakdown = game.pf2e.settings.metagame.breakdowns || !!message.speaker.actor.hasPlayerOwner;
            const flavor = showBreakdown
                ? '<div class="tags" data-tooltip-class="pf2e"></div><hr><div class="tags modifiers"><span class="tag tag_transparent">1d6 Bludgeoning</span></div>'
                : '<div class="tags" data-tooltip-class="pf2e"></div><hr><div class="tags modifiers"><span class="tag tag_transparent" data-visibility="gm">1d6 Bludgeoning</span></div>';

            const roll = Utils.Roll.newDamageRoll("{1d6[bludgeoning]}", {}, { showBreakdown });

            const contextFlag: DamageDamageContextFlag = {
                type: "damage-roll",
                sourceType: "save",
                actor: message.speaker.actor.id,
                token: message.speaker.token?.id ?? null,
                target: null,
                domains: ["damage", "inline-damage"],
                options: message.speaker.actor.getRollOptions(),
                notes: [],
                secret: false,
                rollMode: game.settings.get("core", "rollMode"),
                traits: [],
                skipDialog: true,
                outcome: null,
                unadjustedOutcome: null,
            };

            const messageData = await roll.toMessage(
                {
                    speaker: ChatMessage.getSpeaker({ actor: message.speaker.actor, token: message.speaker.token }),
                    flavor,
                    flags: {
                        pf2e: {
                            context: contextFlag,
                            target: null,
                            modifiers: [],
                            dice: [],
                            strike: null,
                            preformatted: "both",
                        },
                    },
                },
                { create: false },
            );

            await Utils.ChatMessagePF2e.create(messageData, { rollMode: game.settings.get("core", "rollMode") });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:success"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.toggleCondition(message.target.actor, "prone", { active: true });
        },
    },
    {
        trigger: "skill-check",
        predicate: ["action:trip", "check:outcome:critical-failure"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;

            game.assistant.socket.toggleCondition(message.speaker.actor, "prone", { active: true });
        },
    },
];
