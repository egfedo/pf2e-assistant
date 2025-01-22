import { ConditionSlug, ItemSourcePF2e } from "foundry-pf2e";

export interface Reroll {
    addCondition: { actor: ActorUUID; condition: ConditionSlug }[];
    removeCondition: { actor: ActorUUID; condition: ConditionSlug }[];
    setCondition: { actor: ActorUUID; condition: ConditionSlug; value: number }[];
    removeItem: { actor: ActorUUID; item: ItemUUID }[];
    addItem: { actor: ActorUUID; item: ItemSourcePF2e }[];
    deleteChatMessage: ChatMessageUUID[];
}

export function createReroll(): Reroll {
    return { addCondition: [], removeCondition: [], setCondition: [], removeItem: [], addItem: [], deleteChatMessage: [] };
}