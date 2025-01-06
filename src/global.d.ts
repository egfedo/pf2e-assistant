import { GamePF2e, DamageDamageContextFlag } from "foundry-pf2e";
import { AssistantMessage } from "message.ts";
import { AssistantStorage } from "storage.ts";

declare module "foundry-pf2e" {
    interface GamePF2e {
        assistant: {
            socket: AssistantSocket,
            storage: AssistantStorage
        };
    }
}