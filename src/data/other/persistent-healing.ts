import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const label = "Other | Persistent Healing";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["condition:fast-healing"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.speaker?.token) return;
            if (!Utils.isInstanceOf(message.roll, "DamageRoll")) return;

            if (
                !(
                    game.modules.get("xdy-pf2e-workbench")?.active &&
                    game.settings.get("xdy-pf2e-workbench", "applyPersistentHealing")
                )
            ) {
                await message.speaker.actor.applyDamage({
                    damage: -(message.roll.total ?? 0),
                    token: message.speaker.token,
                    rollOptions: new Set([...message.speaker.actor.getSelfRollOptions()]),
                    skipIWR: true,
                });
            }
        },
    },
];
