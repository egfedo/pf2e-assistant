import { Assistant } from "assistant.ts";
import { ActorPF2e, ChatMessagePF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

function waitForMessage(id: string, ms = 250, attempts = 120): Promise<void> {
    return new Promise<void>(function (resolve, reject) {
        (function wait(count = 0) {
            if (count > attempts) return reject();

            if (count != 0 && ui.chat.element.find(`.message[data-message-id="${id}"]:visible`).length !== 0)
                return resolve();

            setTimeout(wait, ms, count + 1);
        })();
    });
}

Hooks.on("createChatMessage", function (chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;
    if (chatMessage.flags["pf2e-assistant"]?.process === false) return;

    const data = processChatMessage(chatMessage);
    waitForMessage(chatMessage.id)
        .then(() => game.assistant.storage.process(data))
        .then((reroll) => processReroll(data, reroll));
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

    if (data.trigger === "") {
        if (chatMessage.item?.isOfType("condition") && chatMessage.item.slug === "persistent-damage") {
            data.trigger = "damage-roll";
        } else if (chatMessage.item?.isOfType("spell")) {
            data.trigger = "spell-cast";
        } else if (chatMessage.item?.isOfType("consumable") && Utils.ChatMessage.isConsume(chatMessage)) {
            data.trigger = "consumable";
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
    if (data.speaker) data.rollOptions.push(...Utils.Actor.getRollOptions(data.speaker.actor, "self"));
    if (data.target) data.rollOptions.push(...Utils.Actor.getRollOptions(data.target.actor, "target"));
    if (data.origin) data.rollOptions.push(...Utils.Actor.getRollOptions(data.origin.actor, "origin"));

    data.rollOptions = Array.from(new Set(data.rollOptions)).sort();

    return data;
}

function processReroll(data: Assistant.Data, reroll: Assistant.Reroll) {
    if (data.chatMessage && data.speaker && Object.values(reroll).some((value) => value.length !== 0)) {
        data.chatMessage.update({
            flags: {
                "pf2e-assistant": {
                    reroll: {
                        [data.speaker.token.id]: reroll
                    }
                }
            }
        });
    }
}
