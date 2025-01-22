import { Action } from "./action.ts";

export interface Module {
    path: string[];
    actions: Action[];
}
