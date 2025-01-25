import { ItemPF2e } from "foundry-pf2e";

export async function getSlugs(key: string) {
    const pack = game.packs.get<CompendiumCollection<ItemPF2e<null>>>(key);
    if (pack) {
        if (pack.documentName !== "Item") return undefined;
        const documents = await pack.getDocuments();
        return documents
            .filter((item) => item.slug !== null)
            .map((item) => ({ slug: item.slug, uuid: item.uuid }));
    }
    return undefined;
}
