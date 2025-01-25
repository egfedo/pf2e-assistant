import { RuleElementSource } from "foundry-pf2e";

export interface MarkTokenSource extends RuleElementSource {
    slug?: JSONValue;
    uuid?: JSONValue;
}

export interface RollOptionSource extends RuleElementSource {
    domain?: JSONValue;
    option?: JSONValue;
    toggleable?: JSONValue;
    suboptions?: JSONValue;
    value?: JSONValue;
    selection?: JSONValue;
    disabledIf?: JSONValue;
    disabledValue?: JSONValue;
    count?: JSONValue;
    removeAfterRoll?: JSONValue;
}

export const isMarkToken = (ruleElement: RuleElementSource): ruleElement is MarkTokenSource =>
    ruleElement.key === "MarkToken";
export const isRollOption = (ruleElement: RuleElementSource): ruleElement is RollOptionSource =>
    ruleElement.key === "MarkToken";
