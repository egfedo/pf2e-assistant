import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["check:outcome:critical-success", "critical-specialization", "item:group:sword"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor || !message.target?.actor) return;

            await game.assistant.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: `${game.i18n.localize("PF2E.Actor.Creature.CriticalSpecialization")} (${game.i18n.localize("PF2E.WeaponGroupSword")})`,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null,
                        },
                        target: {
                            actor: message.target.actor.uuid,
                            token: message.target.token?.uuid ?? null,
                        },
                        roll: {
                            degreeOfSuccess: 3,
                        },
                    },
                    description: {
                        value: game.i18n.localize("PF2E.Item.Weapon.CriticalSpecialization.sword"),
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1,
                    },
                    rules: [
                        {
                            key: "GrantItem",
                            // @ts-expect-error
                            onDeleteActions: {
                                grantee: "restrict",
                            },
                            uuid: "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg",
                        },
                    ],
                },
            });
        },
    },
];
