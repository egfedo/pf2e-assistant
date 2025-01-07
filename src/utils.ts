import {
    AbilityItemPF2e,
    ActorPF2e,
    AfflictionPF2e,
    AncestryPF2e,
    ArmorPF2e,
    ArmyPF2e,
    BackgroundPF2e,
    BookPF2e,
    CampaignFeaturePF2e,
    CharacterPF2e,
    ChatContextFlag,
    ChatMessageFlagsPF2e,
    CheckContextChatFlag,
    CheckDC,
    ClassPF2e,
    ConditionPF2e,
    ConsumablePF2e,
    ContainerPF2e,
    CreaturePF2e,
    DamageRoll,
    DamageRollData,
    DeityPF2e,
    EffectPF2e,
    EquipmentPF2e,
    FamiliarPF2e,
    FeatPF2e,
    HazardPF2e,
    HeritagePF2e,
    ItemPF2e,
    KitPF2e,
    LootPF2e,
    LorePF2e,
    MeleePF2e,
    NPCPF2e,
    PartyPF2e,
    ShieldPF2e,
    SpellcastingEntryPF2e,
    SpellPF2e,
    TreasurePF2e,
    VehiclePF2e,
    WeaponPF2e,
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
    export const ChatMessagePF2e = getDocumentClass("ChatMessage");

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
            let item = await fromUuid<ItemPF2e<ActorPF2e>>(itemUuid);
            if (!item) {
                let parts = itemUuid.split(".");
                let actor = await fromUuid<ActorPF2e>(parts.slice(0, -2).join("."));
                if (actor) {
                    item = actor.system.actions?.find((x) => x.item.id == parts.at(-1))?.item as ItemPF2e<ActorPF2e>;
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

    export namespace DOM {
        type MaybeHTML = Maybe<Document | Element | EventTarget>;

        export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
            nodeName: K,
            options?: CreateHTMLElementOptionsWithChildren,
        ): HTMLElementTagNameMap[K];
        export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
            nodeName: K,
            options?: CreateHTMLElementOptionsWithInnerHTML,
        ): HTMLElementTagNameMap[K];
        export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
            nodeName: K,
            options?: CreateHTMLElementOptionsWithNeither,
        ): HTMLElementTagNameMap[K];
        export function createHTMLElement<K extends keyof HTMLElementTagNameMap>(
            nodeName: K,
            { classes = [], dataset = {}, children = [], innerHTML }: CreateHTMLElementOptions = {},
        ): HTMLElementTagNameMap[K] {
            const element = document.createElement(nodeName);
            if (classes.length > 0) element.classList.add(...classes);

            for (const [key, value] of Object.entries(dataset).filter(
                ([, v]) => v !== undefined && v !== null && v !== false,
            )) {
                element.dataset[key] = value === true ? "" : String(value);
            }

            if (innerHTML) {
                element.innerHTML = innerHTML;
            } else {
                for (const child of children) {
                    const childElement = child instanceof HTMLElement ? child : new Text(child);
                    element.appendChild(childElement);
                }
            }

            return element;
        }

        interface CreateHTMLElementOptions {
            classes?: string[];
            dataset?: Record<string, Maybe<string | number | boolean>>;
            children?: (HTMLElement | string)[];
            innerHTML?: string;
        }

        interface CreateHTMLElementOptionsWithChildren extends CreateHTMLElementOptions {
            children: (HTMLElement | string)[];
            innerHTML?: never;
        }

        interface CreateHTMLElementOptionsWithInnerHTML extends CreateHTMLElementOptions {
            children?: never;
            innerHTML: string;
        }

        interface CreateHTMLElementOptionsWithNeither extends CreateHTMLElementOptions {
            children?: never;
            innerHTML?: never;
        }

        export function htmlQuery<K extends keyof HTMLElementTagNameMap>(
            parent: MaybeHTML,
            selectors: K,
        ): HTMLElementTagNameMap[K] | null;
        export function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null;
        export function htmlQuery<E extends HTMLElement = HTMLElement>(parent: MaybeHTML, selectors: string): E | null;
        export function htmlQuery(parent: MaybeHTML, selectors: string): HTMLElement | null {
            if (!(parent instanceof Element || parent instanceof Document)) return null;
            return parent.querySelector<HTMLElement>(selectors);
        }
    }

    export namespace Roll {
        let _DamageRoll: typeof DamageRoll;

        export function newDamageRoll(formula: string, data?: {}, options?: DamageRollData): DamageRoll {
            return new (_DamageRoll ??= CONFIG.Dice.rolls.find(
                (roll) => roll.name === "DamageRoll",
            ) as typeof DamageRoll)(formula, data, options);
        }
    }
    
    export function isInstanceOf(obj: unknown, cls: "ActorPF2e"): obj is ActorPF2e;
    export function isInstanceOf(obj: unknown, cls: "ArmyPF2e"): obj is ArmyPF2e;
    export function isInstanceOf(obj: unknown, cls: "CharacterPF2e"): obj is CharacterPF2e;
    export function isInstanceOf(obj: unknown, cls: "CreaturePF2e"): obj is CreaturePF2e;
    export function isInstanceOf(obj: unknown, cls: "FamiliarPF2e"): obj is FamiliarPF2e;
    export function isInstanceOf(obj: unknown, cls: "HazardPF2e"): obj is HazardPF2e;
    export function isInstanceOf(obj: unknown, cls: "LootPF2e"): obj is LootPF2e;
    export function isInstanceOf(obj: unknown, cls: "PartyPF2e"): obj is PartyPF2e;
    export function isInstanceOf(obj: unknown, cls: "NPCPF2e"): obj is NPCPF2e;
    export function isInstanceOf(obj: unknown, cls: "VehiclePF2e"): obj is VehiclePF2e;
    export function isInstanceOf(obj: unknown, cls: "ItemPF2e"): obj is ItemPF2e;
    export function isInstanceOf(obj: unknown, cls: "AbilityItemPF2e"): obj is AbilityItemPF2e;
    export function isInstanceOf(obj: unknown, cls: "AfflictionPF2e"): obj is AfflictionPF2e;
    export function isInstanceOf(obj: unknown, cls: "AncestryPF2e"): obj is AncestryPF2e;
    export function isInstanceOf(obj: unknown, cls: "ArmorPF2e"): obj is ArmorPF2e;
    export function isInstanceOf(obj: unknown, cls: "BackgroundPF2e"): obj is BackgroundPF2e;
    export function isInstanceOf(obj: unknown, cls: "ContainerPF2e"): obj is ContainerPF2e;
    export function isInstanceOf(obj: unknown, cls: "BookPF2e"): obj is BookPF2e;
    export function isInstanceOf(obj: unknown, cls: "CampaignFeaturePF2e"): obj is CampaignFeaturePF2e;
    export function isInstanceOf(obj: unknown, cls: "ClassPF2e"): obj is ClassPF2e;
    export function isInstanceOf(obj: unknown, cls: "ConditionPF2e"): obj is ConditionPF2e;
    export function isInstanceOf(obj: unknown, cls: "ConsumablePF2e"): obj is ConsumablePF2e;
    export function isInstanceOf(obj: unknown, cls: "DeityPF2e"): obj is DeityPF2e;
    export function isInstanceOf(obj: unknown, cls: "EffectPF2e"): obj is EffectPF2e;
    export function isInstanceOf(obj: unknown, cls: "EquipmentPF2e"): obj is EquipmentPF2e;
    export function isInstanceOf(obj: unknown, cls: "FeatPF2e"): obj is FeatPF2e;
    export function isInstanceOf(obj: unknown, cls: "HeritagePF2e"): obj is HeritagePF2e;
    export function isInstanceOf(obj: unknown, cls: "KitPF2e"): obj is KitPF2e;
    export function isInstanceOf(obj: unknown, cls: "LorePF2e"): obj is LorePF2e;
    export function isInstanceOf(obj: unknown, cls: "MeleePF2e"): obj is MeleePF2e;
    export function isInstanceOf(obj: unknown, cls: "ShieldPF2e"): obj is ShieldPF2e;
    export function isInstanceOf(obj: unknown, cls: "SpellPF2e"): obj is SpellPF2e;
    export function isInstanceOf(obj: unknown, cls: "SpellcastingEntryPF2e"): obj is SpellcastingEntryPF2e;
    export function isInstanceOf(obj: unknown, cls: "TreasurePF2e"): obj is TreasurePF2e;
    export function isInstanceOf(obj: unknown, cls: "WeaponPF2e"): obj is WeaponPF2e;
    export function isInstanceOf(obj: unknown, cls: string) {
        if (typeof obj !== "object" || obj === null || obj === undefined) return false;

        let cursor = Reflect.getPrototypeOf(obj);
        while (cursor) {
            if (cursor.constructor.name === cls) return true;
            cursor = Reflect.getPrototypeOf(cursor);
        }

        return false;
    }
}
