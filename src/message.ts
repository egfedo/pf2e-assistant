import { ActorPF2e, ChatMessagePF2e, ItemPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

export interface AssistantMessage {
    trigger: string;

    rollOptions: string[];

    chatMessage?: ChatMessagePF2e;

    roll?: Roll;

    item?: ItemPF2e<ActorPF2e>;

    speaker?: {
        actor: ActorPF2e;
        token: TokenDocumentPF2e<ScenePF2e>;
    };

    target?: {
        actor: ActorPF2e;
        token: TokenDocumentPF2e<ScenePF2e>;
    };

    origin?: {
        actor: ActorPF2e;
        token: TokenDocumentPF2e<ScenePF2e>;
    };
}

let HEALING_REGEX: RegExp;
function isFastHealing(chatMessage: ChatMessagePF2e): boolean {
    HEALING_REGEX ??= (() => {
        const healing = [
            game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.fast-healing.ReceivedMessage"),
            game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.regeneration.ReceivedMessage"),
        ];
        return new RegExp(`^<div>(${healing.join("|")})</div>`);
    })();
    return HEALING_REGEX.test(chatMessage.flavor);
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
        } else if (chatMessage.isDamageRoll && isFastHealing(chatMessage)) {
            trigger = "damage-roll";
            rollOptions.add("condition:fast-healing");
        }
    }

    if (chatMessage.item) {
        message.item = chatMessage.item;
    }

    const outcome = chatMessage.flags.pf2e.context?.outcome;
    if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

    if (chatMessage.actor && chatMessage.token) {
        message.speaker = {
            actor: chatMessage.actor,
            token: chatMessage.token,
        };
    }

    if (chatMessage.target) {
        message.target = {
            actor: chatMessage.target.actor,
            token: chatMessage.target.token,
        };
    }

    if (Utils.ChatMessage.isCheckContext(chatMessage.flags.pf2e.context)) {
        let checkContext = chatMessage.flags.pf2e.context;

        if (checkContext.origin) {
            let actor = fromUuidSync<ActorPF2e>(checkContext.origin.actor);
            let token = fromUuidSync<TokenDocumentPF2e<ScenePF2e>>(checkContext.origin.token ?? "");

            if (actor && token) {
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

    if (chatMessage.isCheckRoll || chatMessage.isDamageRoll) {
        message.roll = chatMessage.rolls.at(0);
    }

    if (["action", "consume", "damage-roll", "self-effect"].includes(trigger)) {
        (message.item?.getRollOptions() ?? []).forEach((option) => rollOptions.add(option));
    }

    message.trigger = trigger;
    message.rollOptions = Array.from(rollOptions).sort();
    message.chatMessage = chatMessage;

    return message;
}
