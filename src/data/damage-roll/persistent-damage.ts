import { AssistantAction } from "action.ts";
import { DamageRoll } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { Utils } from "utils.ts";

export const actions: AssistantAction[] = [
    {
        trigger: "damage-roll",
        predicate: ["condition:persistent-damage"],
        process: async (message: AssistantMessage) => {
            if (!message.speaker?.actor) return;
            if (!message.speaker?.token) return;
            if (!message.item?.isOfType("condition")) return;
            if (!Utils.isInstanceOf(message.roll, "DamageRoll")) return;

            if (
                !(
                    game.modules.get("xdy-pf2e-workbench")?.active &&
                    game.settings.get("xdy-pf2e-workbench", "applyPersistentDamage")
                )
            ) {
                await message.speaker.actor.applyDamage({
                    damage: message.roll as Rolled<DamageRoll>,
                    token: message.speaker.token,
                    item: message.item,
                    rollOptions: new Set([
                        ...message.item.getRollOptions("item"),
                        ...message.speaker.actor.getSelfRollOptions(),
                    ]),
                    skipIWR: false,
                });
            }

            if (
                !(
                    game.modules.get("xdy-pf2e-workbench")?.active &&
                    game.settings.get("xdy-pf2e-workbench", "applyPersistentDamageRecoveryRoll")
                )
            ) {
                await message.item.rollRecovery();
            }
        },
    },
];
