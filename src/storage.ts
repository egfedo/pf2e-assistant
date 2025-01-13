import { AssistantAction } from "action.ts";
import { AssistantMessage } from "message.ts";

const modules = import.meta.glob<AssistantModule>("./data/**/*.ts");

interface AssistantModule {
    label: string;
    actions: AssistantAction[];
}

interface AssistantFile {
    label: string;
    path: string;
}

export class AssistantStorage {
    #data: AssistantAction[] = [];
    #files: AssistantFile[] = [];

    constructor() {
        const disabledFiles = game.settings.get("pf2e-assistant", "disabledFiles");

        for (const path in modules) {
            modules[path]().then((mod) => {
                this.#files.push({ label: mod.label ?? path, path });
                if (!disabledFiles.includes(path)) {
                    this.#data.push(...mod.actions);
                }
            });
        }
    }

    add(action: AssistantAction) {
        this.#data.push(action);
    }

    getFiles() {
        const disabledFiles = game.settings.get("pf2e-assistant", "disabledFiles");
        return this.#files.map((value) => { return { label: value.label, path: value.path, enabled: !disabledFiles.includes(value.path) }; });
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
