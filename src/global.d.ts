import { AssistantSocket } from "socket.ts";
import { AssistantStorage } from "storage.ts";

declare module "foundry-pf2e" {
    interface GamePF2e {
        assistant: {
            socket: AssistantSocket;
            storage: AssistantStorage;
        };
    }
}

declare global {
    interface ClientSettings {
        get(module: "pf2e-assistant", setting: "disabledFiles"): string[];
        set(module: "pf2e-assistant", setting: "disabledFiles", value: string[]): Promise<string[]>;
    }
}