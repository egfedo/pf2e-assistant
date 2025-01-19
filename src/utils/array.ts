import * as R from "remeda";

export function isStringArray(data: unknown): data is string[] {
    if (R.isArray(data)) {
        return data.every((value) => R.isString(value));
    }
    return false;
}
