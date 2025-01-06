import { EffectSource, ItemPF2e } from "foundry-pf2e";
import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "self-effect",
        predicate: [],
        process: async (message: AssistantMessage) => {
            if (game.modules.get("pf2e-toolbelt")?.active && game.settings.get("pf2e-toolbelt", "useButton.selfApplied")) return;
            if (!message.speaker?.actor) return;
            if (!message.item) return;

            const effect =
                message.item.isOfType("action", "feat") && message.item.system.selfEffect
                    ? await fromUuid<ItemPF2e>(message.item.system.selfEffect.uuid)
                    : null;

            if (Utils.isInstanceOf(message.speaker.actor, "ActorPF2e") && Utils.isInstanceOf(effect, "EffectPF2e")) {
                const traits =
                    message.item.system.traits.value?.filter((t) => t in effect.constructor.validTraits) ?? [];
                const effectSource: EffectSource = foundry.utils.mergeObject(effect.toObject(), {
                    _id: null,
                    system: {
                        context: {
                            origin: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                                item: message.item.uuid,
                                spellcasting: null,
                                rollOptions: message.item.getOriginData().rollOptions,
                            },
                            target: {
                                actor: message.speaker.actor.uuid,
                                token: message.speaker.token?.uuid ?? null,
                            },
                            roll: null,
                        },
                        traits: { value: traits },
                    },
                });
                await game.assistant.socket.createEmbeddedItem(message.speaker.actor, effectSource);
                const parsedMessageContent = ((): HTMLElement => {
                    const container = document.createElement("div");
                    container.innerHTML = message.chatMessage.content;
                    return container;
                })();

                const buttons = Utils.DOM.htmlQuery(parsedMessageContent, ".message-buttons");
                if (buttons) {
                    const span = Utils.DOM.createHTMLElement("span", { classes: ["effect-applied"] });
                    const anchor = effect.toAnchor({ attrs: { draggable: "true" } });
                    const locKey = "PF2E.Item.Ability.SelfAppliedEffect.Applied";
                    const statement = game.i18n.format(locKey, { effect: anchor.outerHTML });
                    span.innerHTML = statement;
                    Utils.DOM.htmlQuery(buttons, "button[data-action=apply-effect]")?.replaceWith(span);
                    await message.chatMessage.update({ content: parsedMessageContent.innerHTML });
                }
            }
        },
    },
];
