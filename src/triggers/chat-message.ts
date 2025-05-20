import { Assistant } from "assistant.ts";
import { ActorPF2e, ChatMessagePF2e, ConsumablePF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

function waitForMessage(chatMessage: ChatMessagePF2e, ms = 250, attempts = 40): Promise<ChatMessagePF2e> {
    return new Promise<ChatMessagePF2e>(function (resolve) {
        (function wait(count = 0) {
            if (count > attempts) return resolve(chatMessage);

            if (count !== 0) {
                if (ui.chat.element.find(`.message[data-message-id="${chatMessage.id}"]:visible`).length !== 0) {
                    return resolve(chatMessage);
                }
            }

            setTimeout(wait, ms, count + 1);
        })();
    });
}

const createChatMessage = Hooks.on("createChatMessage", function (chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor) return;
    if (chatMessage.flags["pf2e-assistant"]?.process === false) return;

    waitForMessage(chatMessage)
        .then((value) => processChatMessage(value))
        .then((value) => game.assistant.storage.process(value))
        .then((value) => processReroll(value.data, value.reroll));
});

async function processChatMessage(chatMessage: ChatMessagePF2e): Promise<Assistant.Data> {
    let data: Assistant.Data = {
        trigger: chatMessage.flags.pf2e.context?.type ?? "",
        rollOptions: [],
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
        } else if (Utils.ChatMessage.isConsume(chatMessage.flags.pf2e.origin)) {
            const item = await fromUuid<ConsumablePF2e>(chatMessage.flags.pf2e.origin.sourceId);
            data.trigger = "consumable";
            data.item = item ?? undefined;
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

    if (data.speaker) data.rollOptions.push(...Utils.Actor.getRollOptions(data.speaker.actor, "self"));

    if (data.target) {
        data.rollOptions.push(...Utils.Actor.getRollOptions(data.target.actor, "target"));
        if (data.speaker) {
            const allyOrEnemy = data.target.actor.alliance === data.speaker.actor.alliance ? "ally" : "enemy";
            data.rollOptions.push(`target:${allyOrEnemy}`);
        }
    }

    if (data.origin) {
        data.rollOptions.push(...Utils.Actor.getRollOptions(data.origin.actor, "origin"));
        if (data.speaker) {
            const allyOrEnemy = data.origin.actor.alliance === data.speaker.actor.alliance ? "ally" : "enemy";
            data.rollOptions.push(`origin:${allyOrEnemy}`);
        }
    }

    if (data.item) data.rollOptions.push(...data.item.getRollOptions("item"));

    return data;
}

async function processReroll(data: Assistant.Data, reroll: Assistant.Reroll) {
    if (data.chatMessage && data.speaker && Object.values(reroll).some((value) => value.length !== 0)) {
        await data.chatMessage.update({
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

if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(() => {
        Hooks.off("createChatMessage", createChatMessage);
    });
}
