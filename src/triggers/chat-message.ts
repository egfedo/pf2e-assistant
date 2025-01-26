import { Assistant } from "assistant.ts";
import { ActorPF2e, ChatMessagePF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

let messageQueue = new Set<string>();

Hooks.on("createChatMessage", function (chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;
    if (chatMessage.flags["pf2e-assistant"]?.process === false) return;
    messageQueue.add(chatMessage.id);
});

Hooks.on("renderChatMessage", function name(chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;
    if (!messageQueue.has(chatMessage.id)) return;

    const data = processChatMessage(chatMessage);
    game.assistant.storage.process(data);

    messageQueue.delete(chatMessage.id);
});

function processChatMessage(chatMessage: ChatMessagePF2e): Assistant.Data {
    let data: Assistant.Data = {
        trigger: chatMessage.flags.pf2e.context?.type ?? "",
        rollOptions: chatMessage.flags.pf2e.context?.options ?? [],
        chatMessage: chatMessage
    };

    if (chatMessage.flags.pf2e.context?.domains) {
        data.domains = chatMessage.flags.pf2e.context.domains;
    }

    if (["", "spell-cast"].includes(data.trigger)) {
        if (
            chatMessage.item?.isOfType("condition") &&
            chatMessage.item.slug === "persistent-damage"
        ) {
            data.trigger = "damage-roll";
        } else if (chatMessage.item?.isOfType("action", "feat", "spell")) {
            data.trigger = "action";
        } else if (
            chatMessage.item?.isOfType("consumable") &&
            Utils.ChatMessage.isConsume(chatMessage)
        ) {
            data.trigger = "consume";
        } else if (chatMessage.isDamageRoll && Utils.ChatMessage.isFastHealing(chatMessage)) {
            data.trigger = "damage-roll";
            data.rollOptions.push("self:condition:fast-healing");
        }
    }

    if (data.trigger === "damage-taken" && Utils.ChatMessage.isShieldBlock(chatMessage)) {
        data.rollOptions.push("self:shield:block");
    }

    if (chatMessage.item) {
        data.item = chatMessage.item;
    }

    const outcome = chatMessage.flags.pf2e.context?.outcome;
    if (outcome) data.rollOptions.push(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

    if (chatMessage.actor && chatMessage.token) {
        data.speaker = {
            actor: chatMessage.actor,
            token: chatMessage.token
        };
    }

    if (chatMessage.target) {
        data.target = {
            actor: chatMessage.target.actor,
            token: chatMessage.target.token
        };
    } else {
        const target = Utils.User.getTargets()[0];

        if (target && target.actor) {
            data.target = {
                actor: target.actor,
                token: target.document
            };
        }
    }

    if (Utils.ChatMessage.isCheckContextFlag(chatMessage.flags.pf2e.context)) {
        let checkContext = chatMessage.flags.pf2e.context;

        if (checkContext.origin) {
            let actor = fromUuidSync<ActorPF2e>(checkContext.origin.actor);
            let token = fromUuidSync<TokenDocumentPF2e<ScenePF2e>>(checkContext.origin.token ?? "");

            if (actor && token) {
                data.origin = {
                    actor,
                    token
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

    if (data.item) data.rollOptions.push(...data.item.getRollOptions("item"));
    if (data.speaker)
        data.rollOptions.push(...Utils.Actor.getRollOptions(data.speaker.actor, "self"));
    if (data.target)
        data.rollOptions.push(...Utils.Actor.getRollOptions(data.target.actor, "target"));
    if (data.origin)
        data.rollOptions.push(...Utils.Actor.getRollOptions(data.origin.actor, "origin"));

    data.rollOptions = Array.from(new Set(data.rollOptions)).sort();
    return data;
}
