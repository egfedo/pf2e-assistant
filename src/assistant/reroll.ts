import { ConditionSource, ItemSourcePF2e } from "foundry-pf2e";

export interface Reroll {
    updateCondition: UpdateCondition[];
    removeItem: RemoveItem[];
    addItem: AddItem[];
    deleteChatMessage: ChatMessageUUID[];
}

export interface UpdateCondition {
    actor: ActorUUID;
    id: string;
    source?: ConditionSource;
}

export interface RemoveItem {
    actor: ActorUUID;
    item: ItemUUID;
}

export interface AddItem {
    actor: ActorUUID;
    item: ItemSourcePF2e;
}

export function createReroll(): Reroll {
    return {
        updateCondition: [],
        removeItem: [],
        addItem: [],
        deleteChatMessage: []
    };
}
