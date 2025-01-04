import { PredicateStatement } from "foundry-pf2e";
import { AssistantMessage } from "./message.ts";

export interface AssistantAction {
    trigger: string;
    predicate: PredicateStatement[];
    process(message: AssistantMessage): Promise<void>;
}