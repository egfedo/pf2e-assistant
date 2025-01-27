import { Assistant } from "assistant.ts";
import { Utils } from "utils.ts";

export const path = ["Feats", "Aura of Courage"];

export const actions: Assistant.Action[] = [
    {
        trigger: "end-turn",
        predicate: ["champions-aura", "feat:aura-of-courage"],
        process: async (data: Assistant.Data) => {
            if (!data.speaker) return;

            const championsAura = data.speaker.token.auras.get("champions-aura");
            if (championsAura) {
                const allies = data.speaker.token.scene.tokens.filter(
                    (token) =>
                        (token.actor?.isAllyOf(data.speaker!.actor) ?? false) &&
                        token.actor?.uuid !== data.speaker!.actor.uuid
                );
                const inAura = allies.filter((token) => championsAura.containsToken(token));

                for (const ally of inAura) {
                    if (!ally.actor) continue;

                    const conditions = ally.actor.itemTypes.condition.filter(
                        (item) => item.slug === "frightened" && !item.isLocked
                    );

                    for (const condition of conditions) {
                        const currentValue = Utils.Remeda.isNumber(condition.badge?.value)
                            ? condition.badge.value
                            : 0;
                        const newValue = Math.max(0, currentValue - 1);
                        await game.assistant.socket.updateConditionValue(
                            ally.actor,
                            condition.id,
                            newValue
                        );
                    }
                }
            }
        }
    }
];
