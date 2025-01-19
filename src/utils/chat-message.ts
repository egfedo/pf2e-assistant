import { ChatMessageFlagsPF2e, ChatContextFlag, CheckContextChatFlag } from "foundry-pf2e";

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

export function isCheckContext(context?: ChatContextFlag): context is CheckContextChatFlag {
    return [
        "attack-roll",
        "check",
        "counteract-check",
        "flat-check",
        "initiative",
        "perception-check",
        "saving-throw",
        "skill-check",
    ].includes(context?.type ?? "");
}
