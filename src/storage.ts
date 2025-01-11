import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

const modules = import.meta.glob("./data/**/*.ts", { import: "actions" });

export class AssistantStorage {
    #data: AssistantAction[] = [];

    constructor() {
        for (const path in modules) {
            modules[path]().then((mod) => {
                this.#data.push(...(mod as AssistantAction[]));
            });
        }
    }

    add(action: AssistantAction) {
        this.#data.push(action);
    }

    async process(message: AssistantMessage) {
        if (message.trigger == "") return;

        let actions = this.#data.filter(
            (action) =>
                action.trigger == message.trigger && game.pf2e.Predicate.test(action.predicate, message.rollOptions),
        );

        actions.forEach((action) => {
            action.process(message);
        });
    }
}
