import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "action",
        predicate: ["spell:stabilize"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.target?.actor) return;
            if (!message.item?.isOfType("spell")) return;

            if (!message.target.actor.itemTypes.condition.some((c) => c.slug === "dying")) {
                ui.notifications.warn(`The target is not dying.`);
                return;
            }

            await game.assistant.socket.decreaseCondition(message.target.actor, "dying", { forceRemove: true });

            if (
                !(
                    game.modules.get("xdy-pf2e-workbench")?.active &&
                    game.settings.get("xdy-pf2e-workbench", "giveUnconsciousIfDyingRemovedAt0HP")
                ) &&
                message.target.actor.hitPoints?.value === 0
            ) {
                await game.assistant.socket.toggleCondition(message.target.actor, "unconscious", { active: true });
            }

            if (
                !(
                    game.modules.get("xdy-pf2e-workbench")?.active &&
                    game.settings.get("xdy-pf2e-workbench", "giveWoundedWhenDyingRemoved")
                )
            ) {
                await game.assistant.socket.increaseCondition(message.target.actor, "wounded");
            }
        },
    },
];
