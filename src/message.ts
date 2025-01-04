import { ActorPF2e, ChatMessagePF2e, CheckRoll, ItemPF2e, PredicateStatement, TokenDocumentPF2e } from "foundry-pf2e";
import { Utils } from "./utils.ts";

export class AssistantMessage {
    trigger: string = "";

    rollOptions: string[] = [];

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

    static async initialize(chatMessage: ChatMessagePF2e): Promise<AssistantMessage> {
        let message = new AssistantMessage();
        message.trigger = chatMessage.flags.pf2e.context?.type ?? "";
        message.item = chatMessage.item ?? undefined;

        const rollOptions = new Set(chatMessage.flags.pf2e.context?.options ?? []);
        const outcome = chatMessage.flags.pf2e.context?.outcome;
        if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

        if (chatMessage.actor && chatMessage.token) {
            message.speaker = {
                actor: chatMessage.actor,
                token: chatMessage.token,
            };
        }

        if (chatMessage.target?.actor && chatMessage.target?.actor) {
            message.target = {
                actor: chatMessage.target.actor,
                token: chatMessage.target.token,
            };
        }

        if (Utils.ChatMessage.isCheckContext(chatMessage.flags.pf2e.context)) {
            let checkContext = chatMessage.flags.pf2e.context;

            if (checkContext.origin) {
                let actor = await fromUuid<ActorPF2e>(checkContext.origin.actor);
                let token = !checkContext.origin.token
                    ? undefined
                    : await fromUuid<TokenDocumentPF2e>(checkContext.origin.token) ?? undefined;

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
            let actor = await fromUuid<ActorPF2e>(strike.actor);
            if (actor) {
                message.item = actor.system.actions?.[strike.index].item;
            }
        }

        if (chatMessage.isCheckRoll) {
            message.checkRoll = chatMessage.rolls.at(0) as CheckRoll;
        }

        message.rollOptions = Array.from(rollOptions).sort();
        return message;
    }

    test(predicate?: PredicateStatement[]): boolean {
        return game.pf2e.Predicate.test(predicate, this.rollOptions);
    }
}
