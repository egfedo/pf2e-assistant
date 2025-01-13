import { ActorPF2e, ChatMessagePF2e, CheckRoll, ItemPF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

export interface AssistantMessage {
    trigger: string;

    rollOptions: string[];

    chatMessage?: ChatMessagePF2e;

    checkRoll?: CheckRoll;

    item?: ItemPF2e;

    speaker?: {
        actor: ActorPF2e;
        token?: TokenDocumentPF2e;
    };

    target?: {
        actor: ActorPF2e;
        token?: TokenDocumentPF2e;
    };

    origin?: {
        actor: ActorPF2e;
        token?: TokenDocumentPF2e;
    };
}

export function createMessage(chatMessage: ChatMessagePF2e): AssistantMessage {
    let message: AssistantMessage = {
        trigger: "",
        rollOptions: [],
    };

    let trigger = chatMessage.flags.pf2e.context?.type ?? "";
    const rollOptions = new Set(chatMessage.flags.pf2e.context?.options ?? []);

    if (["", "spell-cast"].includes(trigger)) {
        if (chatMessage.item?.isOfType("condition") && chatMessage.item.slug === "persistent-damage") {
            trigger = "damage-roll";
        } else if (chatMessage.item?.isOfType("action", "feat", "spell")) {
            trigger = "action";

            const target = Utils.User.getTargets()[0];
            if (target && target.actor) {
                message.target = {
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
                trigger = "consume";

                const target = Utils.User.getTargets()[0];
                if (target && target.actor) {
                    message.target = {
                        actor: target.actor,
                        token: target.document,
                    };
                }
            }
        }
    }

    if (chatMessage.item) {
        message.item = chatMessage.item;
    }

    const outcome = chatMessage.flags.pf2e.context?.outcome;
    if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

    if (chatMessage.actor) {
        message.speaker = {
            actor: chatMessage.actor,
            token: chatMessage.token ?? undefined,
        };
    }

    if (chatMessage.target?.actor) {
        message.target = {
            actor: chatMessage.target.actor,
            token: chatMessage.target.token,
        };
    }

    if (Utils.ChatMessage.isCheckContext(chatMessage.flags.pf2e.context)) {
        let checkContext = chatMessage.flags.pf2e.context;

        if (checkContext.origin) {
            let actor = fromUuidSync<ActorPF2e>(checkContext.origin.actor);
            let token = !checkContext.origin.token
                ? undefined
                : (fromUuidSync<TokenDocumentPF2e>(checkContext.origin.token) ?? undefined);

            if (actor) {
                message.origin = {
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
            message.item = actor.system.actions?.[strike.index].item;
        }
    }

    if (chatMessage.isCheckRoll) {
        message.checkRoll = chatMessage.rolls.at(0) as CheckRoll;
    }

    if (["action", "consume", "damage-roll", "self-effect"].includes(trigger)) {
        (message.item?.getRollOptions() ?? []).forEach((option) => rollOptions.add(option));
    }

    message.trigger = trigger;
    message.rollOptions = Array.from(rollOptions).sort();
    message.chatMessage = chatMessage;

    return message;
}
