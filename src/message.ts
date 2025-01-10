import { ActorPF2e, ChatMessagePF2e, CheckRoll, ItemPF2e, PredicateStatement, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

export class AssistantMessage {
    trigger: string;

    rollOptions: string[];

    chatMessage: ChatMessagePF2e;

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

    constructor(chatMessage: ChatMessagePF2e) {
        let trigger = chatMessage.flags.pf2e.context?.type as string | undefined;

        if (!trigger || trigger === "spell-cast") {
            if (chatMessage.item?.isOfType("condition") && chatMessage.item.slug === "persistent-damage") {
                trigger = "damage-roll";
            } else if (chatMessage.item?.isOfType("action", "feat", "spell")) {
                trigger = "action";
            } else if (chatMessage.item?.isOfType("consumable") && chatMessage.content) {
                const messages = [
                    game.i18n.format("PF2E.ConsumableMessage.UseExhausted", { name: chatMessage.item.name }),
                    game.i18n.format("PF2E.ConsumableMessage.UseSingle", { name: chatMessage.item.name }),
                ];

                if (messages.some((value) => chatMessage.content.startsWith(value))) {
                    trigger = "consume";
                }
            }
        }

        const rollOptions = new Set(chatMessage.flags.pf2e.context?.options ?? []);
        const outcome = chatMessage.flags.pf2e.context?.outcome;
        if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

        if (chatMessage.actor) {
            this.speaker = {
                actor: chatMessage.actor,
                token: chatMessage.token ?? undefined,
            };
        }

        if (chatMessage.target?.actor) {
            this.target = {
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
                    this.origin = {
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
                this.item = actor.system.actions?.[strike.index].item;
            }
        }

        if (chatMessage.isCheckRoll) {
            this.checkRoll = chatMessage.rolls.at(0) as CheckRoll;
        }

        if (chatMessage.item) {
            chatMessage.item.getRollOptions().forEach((value) => rollOptions.add(value));
        }

        this.trigger = trigger ?? "";
        this.rollOptions = Array.from(rollOptions).sort();
        this.chatMessage = chatMessage;
    }

    test(predicate?: PredicateStatement[]): boolean {
        return game.pf2e.Predicate.test(predicate, this.rollOptions);
    }
}
