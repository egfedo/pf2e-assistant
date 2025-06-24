import { ChoiceSetSource, RuleElementSource } from "foundry-pf2e";

export interface MarkTokenSource extends RuleElementSource {
    slug?: string | null;
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

export const isChoiceSet = (ruleElement: RuleElementSource): ruleElement is ChoiceSetSource =>
    ruleElement.key === "ChoiceSet";
export const isMarkToken = (ruleElement: RuleElementSource): ruleElement is MarkTokenSource =>
    ruleElement.key === "MarkToken";
export const isRollOption = (ruleElement: RuleElementSource): ruleElement is RollOptionSource =>
    ruleElement.key === "MarkToken";
