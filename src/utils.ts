import { ChatContextFlag, ChatMessageFlagsPF2e, CheckContextChatFlag } from "foundry-pf2e";

const CHECK_TYPE = [
    "attack-roll",
    "check",
    "counteract-check",
    "flat-check",
    "initiative",
    "perception-check",
    "saving-throw",
    "skill-check"
];

interface ChatMessageStrikePF2e {
    actor: ActorUUID,
    index: number,
    damaging: true,
    name: string,
    altUsage: "melee" | "thrown" | null
}

export namespace Utils {
    export namespace ChatMessage {
        export function getStrike(flags: ChatMessageFlagsPF2e): ChatMessageStrikePF2e | null {
            if (flags.pf2e.strike) {
                return flags.pf2e.strike as ChatMessageStrikePF2e;
            }

            return null;
        }

        export function isCheckContext(context?: ChatContextFlag): context is CheckContextChatFlag {
            return CHECK_TYPE.includes(context?.type ?? "");
        }
    }
}
