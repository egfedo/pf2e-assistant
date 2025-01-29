import { ActorPF2e, ChatMessagePF2e, CheckPF2e, ItemPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";
import module from "../../module.json" with { type: "json" };

Hooks.once("ready", async () => {
    libWrapper.register<CheckPF2e, typeof CheckPF2e.rerollFromMessage>(
        module.id,
        "game.pf2e.Check.rerollFromMessage",
        async function (
            this: CheckPF2e,
            message: ChatMessagePF2e,
            { heroPoint = false }: { heroPoint?: boolean } = {}
        ) {
            if (!(message.isAuthor || game.user.isGM)) return;

            const actor = message.actor;
            if (!actor) return;

            if (heroPoint) {
                const rerollingActor = actor.isOfType("familiar") ? actor.master : actor;

                if (rerollingActor?.isOfType("character")) {
                    if (rerollingActor.heroPoints.value === 0) return;
                }
            }

            if (!Utils.ChatMessage.isCheckContextFlag(message.flags.pf2e.context)) return;

            await processReroll(message);
        },
        "LISTENER"
    );
});

async function processReroll(chatMessage: ChatMessagePF2e) {
    if (chatMessage.flags["pf2e-assistant"]?.reroll) {
        const reroll = chatMessage.flags["pf2e-assistant"].reroll;

        for (const data of reroll.updateCondition) {
            const actor = await fromUuid<ActorPF2e>(data.actor);

            if (actor) {
                const condition = actor.itemTypes.condition.find((c) => c.id === data.id);

                if (condition) {
                    if (data.source !== undefined) {
                        await game.assistant.socket.updateEmbeddedItem(condition, data.source);
                    } else {
                        await game.assistant.socket.deleteEmbeddedItem(condition);
                    }
                } else if (data.source !== undefined) {
                    await game.assistant.socket.createEmbeddedItem(actor, data.source);
                }
            }
        }

        for (const data of reroll.removeItem) {
            const item = await fromUuid<ItemPF2e>(data.item);

            if (item) {
                await game.assistant.socket.deleteEmbeddedItem(item);
            }
        }

        for (const data of reroll.addItem) {
            const actor = await fromUuid<ActorPF2e>(data.actor);

            if (actor) {
                await game.assistant.socket.createEmbeddedItem(actor, data.item);
            }
        }

        for (const data of reroll.deleteChatMessage) {
            const chatMessage = await fromUuid<ChatMessagePF2e>(data);

            if (chatMessage) {
                await game.assistant.socket.deleteChatMessage(chatMessage);
            }
        }
    }
}
