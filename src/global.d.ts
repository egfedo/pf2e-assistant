import { Assistant } from "assistant.ts";
import "foundry-pf2e";

declare module "foundry-pf2e" {
    interface GamePF2e {
        assistant: {
            socket: Assistant.Socket;
            storage: Assistant.Storage;
        };
    }

    interface ChatMessageFlagsPF2e {
        "pf2e-assistant"?: {
            process?: boolean;
            reroll?: Record<string, Assistant.Reroll>;
        };
    }
}

declare global {
    interface ClientSettings {
        get(module: "pf2e-assistant", setting: "disabledFiles"): string[];
        set(module: "pf2e-assistant", setting: "disabledFiles", value: string[]): Promise<string[]>;

        get(module: "pf2e-assistant", setting: "initialized"): boolean;
        set(module: "pf2e-assistant", setting: "initialized", value: boolean): Promise<boolean>;
    }
}
