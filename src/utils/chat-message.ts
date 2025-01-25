import {
    ChatContextFlag,
    ChatMessageFlagsPF2e,
    ChatMessagePF2e,
    CheckContextChatFlag
} from "foundry-pf2e";

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

let FAST_HEALING_REGEX: RegExp[];
export function isFastHealing(chatMessage: ChatMessagePF2e): boolean {
    FAST_HEALING_REGEX ??= [
        new RegExp(
            `<div>${game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.fast-healing.ReceivedMessage")}</div>`
        ),
        new RegExp(
            `<div>${game.i18n.localize("PF2E.Encounter.Broadcast.FastHealing.regeneration.ReceivedMessage")}</div>`
        )
    ];

    return FAST_HEALING_REGEX.some((value) => value.test(chatMessage.flavor));
}

export function isConsume(chatMessage: ChatMessagePF2e): boolean {
    if (!chatMessage.flags.pf2e.origin) return false;
    if (!chatMessage.item) return false;

    const origin = new Map(Object.entries(chatMessage.flags.pf2e.origin));
    return (
        origin.get("sourceId") === chatMessage.item.sourceId &&
        origin.get("type") === "consumable" &&
        origin.get("uuid") === chatMessage.item.uuid
    );
}

let SHIELD_BLOCK_REGEX: RegExp[];
export function isShieldBlock(chatMessage: ChatMessagePF2e): boolean {
    SHIELD_BLOCK_REGEX ??= [
        new RegExp(
            game.i18n
                .format("PF2E.Actor.ApplyDamage.DamagedForNShield", {
                    actor: "(.*)",
                    absorbedDamage: "([0-9]*)",
                    hpDamage: "([0-9]*)"
                })
                .replace("<actor>", '<span class="target-name">')
                .replace("</actor>", "</span>")
        ),
        new RegExp(
            game.i18n
                .format("PF2E.Actor.ApplyDamage.ShieldAbsorbsAll", {
                    actor: "(.*)",
                    absorbedDamage: "([0-9]*)",
                    hpDamage: "([0-9]*)"
                })
                .replace("<actor>", '<span class="target-name">')
                .replace("</actor>", "</span>")
        )
    ];

    return SHIELD_BLOCK_REGEX.some((value) => value.test(chatMessage.content));
}
