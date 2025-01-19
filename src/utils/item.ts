import { ActorPF2e, ItemPF2e } from "foundry-pf2e";

export async function getItem(itemUuid: ItemUUID): Promise<ItemPF2e | null> {
    let item: Maybe<ItemPF2e> = await fromUuid<ItemPF2e>(itemUuid);
    if (!item) {
        const parts = itemUuid.split(".");
        let actor = await fromUuid<ActorPF2e>(parts.slice(0, -2).join("."));
        if (actor) {
            item = actor.system.actions?.find((x) => x.item.uuid === itemUuid)?.item;
        }
    }

    return item ?? null;
}
