import { AssistantSocket } from "socket.ts";
import { AssistantStorage } from "storage.ts";

declare module "foundry-pf2e" {
    interface GamePF2e {
        assistant: {
            socket: AssistantSocket,
            storage: AssistantStorage
        };
    }
}