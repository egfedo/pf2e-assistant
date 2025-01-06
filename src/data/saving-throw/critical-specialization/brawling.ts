import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "saving-throw",
        predicate: [
            {
                or: ["check:outcome:failure", "check:outcome:critical-failure"],
            },
            "critical-specialization",
            "item:group:brawling",
        ],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.origin?.actor) return;

            await game.assistant.socket.createEmbeddedItem(message.speaker?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: `${game.i18n.localize("PF2E.Actor.Creature.CriticalSpecialization")} (${game.i18n.localize("PF2E.WeaponGroupBrawling")})`,
                system: {
                    context: {
                        origin: {
                            actor: message.origin.actor.uuid,
                            token: message.origin.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                        },
                        target: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                        },
                        roll: {
                            total: message.checkRoll?.total,
                            degreeOfSuccess: message.checkRoll?.degreeOfSuccess ?? null,
                        },
                    },
                    description: {
                        value: game.i18n.localize("PF2E.Item.Weapon.CriticalSpecialization.brawling"),
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "GrantItem",
                            onDeleteActions: {
                                grantee: "restrict",
                            },
                            uuid: "Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3",
                        },
                    ],
                },
            });
        },
    },
];
