import { Assistant } from "assistant.ts";
import { ActorPF2e, ChatMessagePF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

Hooks.on(
    "createChatMessage",
    async function (chatMessage: ChatMessagePF2e, _options: DatabaseCreateOperation<ChatMessagePF2e>, userId: string) {
        if (game.userId !== userId) return;
        if (chatMessage.flags["pf2e-assistant"]?.process === false) return;
        if (chatMessage.flags["pf2e-assistant"]?.reroll) await chatMessage.unsetFlag("pf2e-assistant", "reroll");

        const data = processChatMessage(chatMessage);
        game.assistant.storage.process(data);
    },
);

function processChatMessage(chatMessage: ChatMessagePF2e): Assistant.Data {
    let data: Assistant.Data = {
        trigger: chatMessage.flags.pf2e.context?.type ?? "",
        rollOptions: chatMessage.flags.pf2e.context?.options ?? [],
        chatMessage: chatMessage,
    };

    if (["", "spell-cast"].includes(data.trigger)) {
        if (chatMessage.item?.isOfType("condition") && chatMessage.item.slug === "persistent-damage") {
            data.trigger = "damage-roll";
        } else if (chatMessage.item?.isOfType("action", "feat", "spell")) {
            data.trigger = "action";

            const target = Utils.User.getTargets()[0];
            if (target && target.actor) {
                data.target = {
                    actor: target.actor,
                    token: target.document,
                };
            }
        } else if (chatMessage.item?.isOfType("consumable") && chatMessage.flags.pf2e.origin) {
            const origin = new Map(Object.entries(chatMessage.flags.pf2e.origin));
            if (
                origin.get("sourceId") === chatMessage.item.sourceId &&
                origin.get("type") === "consumable" &&
                origin.get("uuid") === chatMessage.item.uuid
            ) {
                data.trigger = "consume";

                const target = Utils.User.getTargets()[0];
                if (target && target.actor) {
                    data.target = {
                        actor: target.actor,
                        token: target.document,
                    };
                }
            }
        } else if (chatMessage.isDamageRoll && Utils.ChatMessage.isFastHealing(chatMessage)) {
            data.trigger = "damage-roll";
            data.rollOptions.push("condition:fast-healing");
        }
    }

    if (chatMessage.item) {
        data.item = chatMessage.item;
    }

    const outcome = chatMessage.flags.pf2e.context?.outcome;
    if (outcome) data.rollOptions.push(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

    if (chatMessage.actor && chatMessage.token) {
        data.speaker = {
            actor: chatMessage.actor,
            token: chatMessage.token,
        };
    }

    if (chatMessage.target) {
        data.target = {
            actor: chatMessage.target.actor,
            token: chatMessage.target.token,
        };
    }

    if (Utils.ChatMessage.isCheckContextFlag(chatMessage.flags.pf2e.context)) {
        let checkContext = chatMessage.flags.pf2e.context;

        if (checkContext.origin) {
            let actor = fromUuidSync<ActorPF2e>(checkContext.origin.actor);
            let token = fromUuidSync<TokenDocumentPF2e<ScenePF2e>>(checkContext.origin.token ?? "");

            if (actor && token) {
                data.origin = {
                    actor,
                    token,
                };
            }
        }
    }

    let strike = Utils.ChatMessage.getStrike(chatMessage.flags);
    if (strike) {
        let actor = fromUuidSync<ActorPF2e>(strike.actor);
        if (actor) {
            data.item = actor.system.actions?.[strike.index].item;
        }
    }

    if (chatMessage.isCheckRoll || chatMessage.isDamageRoll) {
        data.roll = chatMessage.rolls.at(0);
    }

    if (["action", "consume", "damage-roll", "self-effect"].includes(data.trigger)) {
        data.rollOptions.push(...(data.item?.getRollOptions() ?? []));
    }

    return data;
}
