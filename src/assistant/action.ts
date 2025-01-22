import { PredicateStatement } from "foundry-pf2e";
import { Data } from "./data.ts";
import { Reroll } from "./reroll.ts";

export interface Action {
    trigger: string;
    predicate: PredicateStatement[];
    process(data: Data): Promise<Reroll | void>;
}
