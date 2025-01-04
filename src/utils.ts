import {
    ActorPF2e,
    ChatContextFlag,
    ChatMessageFlagsPF2e,
    CheckContextChatFlag,
    CheckDC,
    ConditionSlug,
    ItemPF2e,
} from "foundry-pf2e";

const CHECK_TYPE = [
    "attack-roll",
    "check",
    "counteract-check",
    "flat-check",
    "initiative",
    "perception-check",
    "saving-throw",
    "skill-check",
];

interface ChatMessageStrikePF2e {
    actor: ActorUUID;
    index: number;
    damaging: true;
    name: string;
    altUsage: "melee" | "thrown" | null;
}

export namespace Utils {
    export namespace Conditions {
        export function getUUID(slug: ConditionSlug): ItemUUID {
            return game.pf2e.ConditionManager.getCondition(slug).uuid;
        }
    }

    export namespace Actor {
        export function getClassDC(actor: ActorPF2e): CheckDC | number | undefined {
            if (actor.isOfType("character")) {
                return !actor.classDC
                    ? undefined
                    : {
                          label: `${actor.classDC.label} DC`,
                          value: actor.classDC.dc.value,
                      };
            }

            if (actor.isOfType("npc")) {
                return actor.attributes.classDC.value;
            }

            return undefined;
        }

        export async function getItem(itemUuid: ItemUUID): Promise<ItemPF2e<ActorPF2e> | undefined> {
            let item = (await fromUuid(itemUuid)) as ItemPF2e<ActorPF2e> ;
            if (!item) {
                let parts = itemUuid.split(".");
                let actor = (await fromUuid(parts.slice(0, -2).join("."))) as ActorPF2e;
                if (actor) {
                    item = actor.system.actions?.find((x) => x.item.id == parts.at(-1))?.item as ItemPF2e<ActorPF2e> ;
                }
            }

            if (item) return item;

            return undefined;
        }
    }

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
