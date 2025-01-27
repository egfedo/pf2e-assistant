import { CombatantPF2e } from "foundry-pf2e";
import { Utils } from "utils.ts";

Hooks.on("pf2e.startTurn", (combatant: CombatantPF2e) => {
    processTurnChange("start-turn", combatant);
});

Hooks.on("pf2e.endTurn", (combatant: CombatantPF2e) => {
    processTurnChange("end-turn", combatant);
});

function processTurnChange(trigger: "start-turn" | "end-turn", combatant: CombatantPF2e) {
    if (!combatant.actor) return;
    if (!combatant.token) return;
    if (!Utils.Token.hasScene(combatant.token)) return;

    game.assistant.storage.process({
        trigger,
        rollOptions: combatant.actor.getRollOptions(),
        speaker: { actor: combatant.actor, token: combatant.token }
    });
}
