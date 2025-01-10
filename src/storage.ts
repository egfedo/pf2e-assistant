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

    async process(message: AssistantMessage) {
        if (message.trigger == "") return;

        let actions = this.#data.filter((x) => x.trigger == message.trigger && message.test(x.predicate));

        actions.forEach((action) => {
            action.process(message);
        });
    }
}
