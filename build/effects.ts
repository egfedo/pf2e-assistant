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

function createDefines(name: string, effects: EffectJSON[]) {
    return effects.map((effect) => `    '${name}["${effect.slug}"]': JSON.stringify("${effect.uuid}"),`);
}

function createGlobal(name: string, effects: EffectJSON[]) {
    let data = [];

    data.push(`declare enum ${name} {`);
    data.push(...effects.map((effect) => `    "${effect.slug}" = "${effect.uuid}",`));
    data.push(`}`);

    return data;
}

function createEffect(name: string, effects: EffectJSON[]) {
    let data = [];

    data.push(`        ${name}: {`);
    data.push(...effects.map((effect) => `            "${effect.slug}": "${effect.uuid}",`));
    data.push(`        },`);

    return data;
}

const defines = [];
defines.push("const define = {");
defines.push(...createDefines("PF2E_ASSISTANT_EFFECTS", PF2E_ASSISTANT_EFFECTS));
defines.push(...createDefines("PF2E_BESTIARY_EFFECTS", PF2E_BESTIARY_EFFECTS));
defines.push(...createDefines("PF2E_CONDITIONS", PF2E_CONDITIONS));
defines.push(...createDefines("PF2E_CAMPAIGN_EFFECTS", PF2E_CAMPAIGN_EFFECTS));
defines.push(...createDefines("PF2E_EQUIPMENT_EFFECTS", PF2E_EQUIPMENT_EFFECTS));
defines.push(...createDefines("PF2E_OTHER_EFFECTS", PF2E_OTHER_EFFECTS));
defines.push(...createDefines("PF2E_FEAT_EFFECTS", PF2E_FEAT_EFFECTS));
defines.push(...createDefines("PF2E_SPELL_EFFECTS", PF2E_SPELL_EFFECTS));
defines.push("} as const;");
defines.push("");
defines.push("export default define;");
defines.push("");

fs.writeFileSync("./vite.defines.ts", defines.join("\n"));

const global = [];

global.push(...createGlobal("PF2E_ASSISTANT_EFFECTS", PF2E_ASSISTANT_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_BESTIARY_EFFECTS", PF2E_BESTIARY_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_CONDITIONS", PF2E_CONDITIONS));
global.push("");
global.push(...createGlobal("PF2E_CAMPAIGN_EFFECTS", PF2E_CAMPAIGN_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_EQUIPMENT_EFFECTS", PF2E_EQUIPMENT_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_OTHER_EFFECTS", PF2E_OTHER_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_FEAT_EFFECTS", PF2E_FEAT_EFFECTS));
global.push("");
global.push(...createGlobal("PF2E_SPELL_EFFECTS", PF2E_SPELL_EFFECTS));
global.push("");

fs.writeFileSync("./src/effects.d.ts", global.join("\n"));

const effect = [];

effect.push("if (import.meta.env.DEV) {");
effect.push("    Object.assign(window, {");
effect.push(...createEffect("PF2E_ASSISTANT_EFFECTS", PF2E_ASSISTANT_EFFECTS));
effect.push(...createEffect("PF2E_BESTIARY_EFFECTS", PF2E_BESTIARY_EFFECTS));
effect.push(...createEffect("PF2E_CONDITIONS", PF2E_CONDITIONS));
effect.push(...createEffect("PF2E_CAMPAIGN_EFFECTS", PF2E_CAMPAIGN_EFFECTS));
effect.push(...createEffect("PF2E_EQUIPMENT_EFFECTS", PF2E_EQUIPMENT_EFFECTS));
effect.push(...createEffect("PF2E_OTHER_EFFECTS", PF2E_OTHER_EFFECTS));
effect.push(...createEffect("PF2E_FEAT_EFFECTS", PF2E_FEAT_EFFECTS));
effect.push(...createEffect("PF2E_SPELL_EFFECTS", PF2E_SPELL_EFFECTS));
effect.push("    });");
effect.push("}");

fs.writeFileSync("./src/effects.ts", effect.join("\n"));
