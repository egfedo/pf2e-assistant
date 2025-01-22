import { ChatContextFlag, ChatMessageFlagsPF2e, ChatMessagePF2e, CheckContextChatFlag } from "foundry-pf2e";

interface ChatMessageStrikePF2e {
    actor: ActorUUID;
    index: number;
    damaging: true;
    name: string;
    altUsage: "melee" | "thrown" | null;
}

export function getStrike(flags: ChatMessageFlagsPF2e): ChatMessageStrikePF2e | null {
    if (flags.pf2e.strike) {
        return flags.pf2e.strike as ChatMessageStrikePF2e;
    }

    return null;
}

export function isCheckContextFlag(flag?: ChatContextFlag): flag is CheckContextChatFlag {
    return !!flag && !["damage-roll", "spell-cast"].includes(flag.type);
}

let HEALING_REGEX: RegExp;
export function isFastHealing(chatMessage: ChatMessagePF2e): boolean {
    HEALING_REGEX ??= (() => {
        const healing = [
            game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.fast-healing.ReceivedMessage"),
            game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.regeneration.ReceivedMessage"),
        ];
        return new RegExp(`^<div>(${healing.join("|")})</div>`);
    })();
    return HEALING_REGEX.test(chatMessage.flavor);
}
