import { Assistant } from "assistant.ts";
import { EffectSource } from "foundry-pf2e";
import { Utils } from "utils.ts";

export const path = ["Spells", "1st Rank", "Shield"];

export const actions: Assistant.Action[] = [
    {
        trigger: "action",
        predicate: [
            "item:slug:shield",
            { "not": "item:tag:psi-cantrip" }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;

            const shieldImmunity = Utils.Actor.getEffect(data.speaker.actor, "effect-shield-immunity");
            if (shieldImmunity) {
                ui.notifications.warn(`${data.speaker.actor.name} is temporarily unable to cast Shield.`);
                return;
            }

            game.assistant.socket.addEmbeddedItem(
                data.speaker.actor,
                "Compendium.pf2e.spell-effects.Item.Jemq5UknGdMO7b73",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid
                            },
                            roll: null,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "action",
        predicate: [
            "item:slug:shield",
            "item:tag:psi-cantrip",
            { "not": "item:tag:amped" }
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;
            const target = data.target ?? data.speaker;

            const shieldImmunity = Utils.Actor.getEffect(data.speaker.actor, "effect-shield-immunity");
            if (shieldImmunity) {
                ui.notifications.warn(`${data.speaker.actor.name} is temporarily unable to cast Shield.`);
                return;
            }

            game.assistant.socket.addEmbeddedItem(
                target.actor,
                "Compendium.pf2e.spell-effects.Item.Jemq5UknGdMO7b73",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: target.actor.uuid,
                                token: target.token.uuid
                            },
                            roll: null,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "action",
        predicate: [
            "item:slug:shield",
            "item:tag:psi-cantrip",
            "item:tag:amped"
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;
            if (!data.item?.isOfType("spell")) return;
            const target = data.target ?? data.speaker;

            const shieldImmunity = Utils.Actor.getEffect(data.speaker.actor, "effect-shield-immunity");
            if (shieldImmunity) {
                ui.notifications.warn(`${data.speaker.actor.name} is temporarily unable to cast Shield.`);
                return;
            }

            game.assistant.socket.addEmbeddedItem(
                target.actor,
                "Compendium.pf2e.spell-effects.Item.N1b28wOrZmuSjN9i",
                {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: data.speaker.actor.uuid,
                                token: data.speaker.token.uuid,
                                item: data.item.uuid,
                                spellcasting: {
                                    attribute: {
                                        type: data.item.attribute,
                                        mod: data.item.spellcasting?.statistic?.attributeModifier?.value ?? 0,
                                    },
                                    tradition: data.item.spellcasting?.tradition,
                                },
                                rollOptions: data.chatMessage?.flags.pf2e.origin?.rollOptions,
                            },
                            target: {
                                actor: target.actor.uuid,
                                token: target.token.uuid
                            },
                            roll: null,
                        },
                        level: {
                            value: data.item.rank,
                        },
                    },
                } as EffectSource,
            );
        },
    },
    {
        trigger: "damage-taken",
        predicate: [
            "self:effect:shield",
            "self:shield:block"
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            const shieldEffect = Utils.Actor.getEffect(data.speaker.actor, "spell-effect-shield");
            if (shieldEffect) {
                const origin = shieldEffect.origin;
                if (origin) {
                    await game.assistant.socket.addEmbeddedItem(
                        origin,
                        "Compendium.pf2e.spell-effects.Item.QF6RDlCoTvkVHRo4",
                        {
                            _id: null,
                            system: {
                                context: shieldEffect.system.context ?? null,
                                level: shieldEffect.system.level,
                            },
                        } as EffectSource,
                    );
                }

                await game.assistant.socket.deleteEmbeddedItem(shieldEffect);
            }
        },
    },
    {
        trigger: "damage-taken",
        predicate: [
            "self:effect:shield-amped",
            "self:shield:block"
        ],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            const shieldEffect = Utils.Actor.getEffect(data.speaker.actor, "spell-effect-shield-amped");
            if (shieldEffect) {
                const origin = shieldEffect.origin;
                const currentValue = shieldEffect.system.badge?.value;
                const rollOption = shieldEffect.system.rules.find((rule) => Utils.Rules.isRuleElement(rule, "RollOption") && rule.option === "shield-block-layers") as Maybe<Utils.Rules.RollOptionSource>;
                const layers = Number(rollOption?.selection ?? "1");

                if (Utils.Remeda.isNonNullish(currentValue) && Utils.Remeda.isNumber(currentValue)) {
                    if ((currentValue - layers) !== 0) {
                        await game.assistant.socket.updateEmbeddedItem(shieldEffect, { system: { badge: { value: currentValue - layers } } });
                    } else {
                        if (origin) {
                            await game.assistant.socket.addEmbeddedItem(
                                origin,
                                "Compendium.pf2e.spell-effects.Item.QF6RDlCoTvkVHRo4",
                                {
                                    _id: null,
                                    system: {
                                        context: shieldEffect.system.context ?? null,
                                        level: shieldEffect.system.level,
                                    },
                                } as EffectSource,
                            );
                        }
                        await game.assistant.socket.deleteEmbeddedItem(shieldEffect);
                    }
                }
            }
        },
    },
];
