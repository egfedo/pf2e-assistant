import { Utils } from "utils.ts";
import { Action } from "./action.ts";
import { Data } from "./data.ts";
import { File } from "./file.ts";
import { Folder } from "./folder.ts";
import { Module } from "./module.ts";
import { createReroll } from "./reroll.ts";

const modules = import.meta.glob<Module>("../data/**/*.ts");

export class Storage {
    #actions: Action[] = [];
    #rootFolder: Folder = { label: "Root", children: [], entries: [] };

    constructor() {
        const disabledFiles = game.settings.get("pf2e-assistant", "disabledFiles");

        for (const path in modules) {
            modules[path]().then((mod) => {
                Storage.addFile(this.#rootFolder, mod.path, path, disabledFiles);
                if (!disabledFiles.includes(path)) {
                    this.#actions.push(...mod.actions);
                }
            });
        }

        Storage.sortFolder(this.#rootFolder);
    }

    addAction(action: Action) {
        this.#actions.push(action);
    }

    private static addFile(folder: Folder, path: string[], value: string, disabledFiles: string[]) {
        if (path.length > 1) {
            let subFolder = folder.children.find((child) => child.label === path[0]);

            if (!subFolder) {
                subFolder = { label: path[0], children: [], entries: [] };
                folder.children.push(subFolder);
            }

            Storage.addFile(subFolder, path.slice(1), value, disabledFiles);
        } else if (path.length == 1) {
            folder.entries.push({ enabled: !disabledFiles.includes(value), label: path[0], value });
        }
    }

    private static sortEntries(a: File, b: File) {
        return a.label.localeCompare(b.label);
    }

    private static sortChildren(a: Folder, b: Folder) {
        return a.label.localeCompare(b.label);
    }

    private static sortFolder(folder: Folder) {
        folder.children.sort(Storage.sortChildren);
        folder.entries.sort(Storage.sortEntries);

        for (const child of folder.children) {
            Storage.sortFolder(child);
        }
    }

    getRootFolder() {
        return Utils.Remeda.clone(this.#rootFolder);
    }

    async process(data: Data) {
        if (data.trigger == "") return;
        const reroll = createReroll();

        let actions = this.#actions.filter(
            (action) => action.trigger == data.trigger && game.pf2e.Predicate.test(action.predicate, data.rollOptions),
        );

        for (const action of actions) {
            const returnedData = await action.process(data);

            if (returnedData) {
                reroll.addCondition.push(...returnedData.addCondition);
                reroll.removeCondition.push(...returnedData.removeCondition);
                reroll.setCondition.push(...returnedData.setCondition);
                reroll.addItem.push(...returnedData.addItem);
                reroll.removeItem.push(...returnedData.removeItem);
                reroll.deleteChatMessage.push(...returnedData.deleteChatMessage);
            }
        }

        if (data.chatMessage) {
            await data.chatMessage.setFlag("pf2e-assistant", "reroll", reroll);
        }
    }
}
