import { Assistant } from "assistant.ts";
import { ChatMessagePF2e, CheckPF2e } from "foundry-pf2e";
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

            const reroll = message.flags["pf2e-assistant"]?.reroll;
            if (reroll !== undefined && message.token !== null) {
                await Assistant.processReroll(reroll[message.token.id]);
            }
        },
        "LISTENER"
    );
});
