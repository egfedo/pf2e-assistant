import { RuleElementSource } from "foundry-pf2e";

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

export function isRuleElement(ruleElement: RuleElementSource, key: "RollOption"): ruleElement is RollOptionSource;
export function isRuleElement(ruleElement: RuleElementSource, key: string) {
    return ruleElement.key === key;
}