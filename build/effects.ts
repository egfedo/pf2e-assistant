import * as fs from "fs";
import PF2E_ASSISTANT_EFFECTS from "../src/effects/pf2e-assistant-effects.json" with { type: "json" };
import PF2E_BESTIARY_EFFECTS from "../src/effects/pf2e-bestiary-effects.json" with { type: "json" };
import PF2E_CAMPAIGN_EFFECTS from "../src/effects/pf2e-campaign-effects.json" with { type: "json" };
import PF2E_CONDITIONS from "../src/effects/pf2e-conditions.json" with { type: "json" };
import PF2E_EQUIPMENT_EFFECTS from "../src/effects/pf2e-equipment-effects.json" with { type: "json" };
import PF2E_FEAT_EFFECTS from "../src/effects/pf2e-feat-effects.json" with { type: "json" };
import PF2E_OTHER_EFFECTS from "../src/effects/pf2e-other-effects.json" with { type: "json" };
import PF2E_SPELL_EFFECTS from "../src/effects/pf2e-spell-effects.json" with { type: "json" };

interface EffectJSON {
    slug: string;
    uuid: string;
}

function createEffect(name: string, effects: EffectJSON[]) {
    let data = [];

    data.push(`export enum ${name} {`);
    data.push(...effects.map((effect) => `    "${effect.slug}" = "${effect.uuid}",`));
    data.push(`};`);

    return data;
}

const effect = [];

effect.push(...createEffect("PF2E_ASSISTANT_EFFECTS", PF2E_ASSISTANT_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_BESTIARY_EFFECTS", PF2E_BESTIARY_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_CONDITIONS", PF2E_CONDITIONS));
effect.push("");
effect.push(...createEffect("PF2E_CAMPAIGN_EFFECTS", PF2E_CAMPAIGN_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_EQUIPMENT_EFFECTS", PF2E_EQUIPMENT_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_OTHER_EFFECTS", PF2E_OTHER_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_FEAT_EFFECTS", PF2E_FEAT_EFFECTS));
effect.push("");
effect.push(...createEffect("PF2E_SPELL_EFFECTS", PF2E_SPELL_EFFECTS));
effect.push("");

fs.writeFileSync("./src/effects.ts", effect.join("\n"));
