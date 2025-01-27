import { ItemPF2e } from "foundry-pf2e";

Hooks.on("createItem", (item: ItemPF2e) => {
    if (!(item.isOfType("effect") || item.isOfType("condition"))) return;
    processEffect("create-effect", item);
});

Hooks.on("deleteItem", (item: ItemPF2e) => {
    if (!(item.isOfType("effect") || item.isOfType("condition"))) return;
    processEffect("delete-effect", item);
});

function processEffect(trigger: "create-effect" | "delete-effect", item: ItemPF2e) {
    if (!item.actor) return;
    const tokens = item.actor.getActiveTokens(true);
    if (tokens.length !== 1) return;

    game.assistant.storage.process({
        trigger,
        rollOptions: [...item.actor.getRollOptions(), ...item.getRollOptions("item")],
        speaker: { actor: item.actor, token: tokens[0].document }
    });
}
