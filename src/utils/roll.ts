import { CheckRoll, DamageRoll } from "foundry-pf2e";

let _CheckRoll: typeof CheckRoll;
let _DamageRoll: typeof DamageRoll;

export function getCheckRoll(): typeof CheckRoll {
    return (_CheckRoll ??= CONFIG.Dice.rolls.find((roll) => roll.name === "CheckRoll") as typeof CheckRoll);
}

export function isCheckRoll(roll: Maybe<Roll>): roll is CheckRoll {
    if (!roll) return false;
    return roll.constructor.name === "CheckRoll";
}

export function getDamageRoll(): typeof DamageRoll {
    return (_DamageRoll ??= CONFIG.Dice.rolls.find((roll) => roll.name === "DamageRoll") as typeof DamageRoll);
}

export function isDamageRoll(roll: Maybe<Roll>): roll is DamageRoll {
    if (!roll) return false;
    return roll.constructor.name === "DamageRoll";
}
