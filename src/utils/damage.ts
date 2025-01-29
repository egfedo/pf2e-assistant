import { DamageDamageContext, DamageDamageContextFlag, DamageTemplate } from "foundry-pf2e";
import { createHTMLElement } from "./dom.ts";
import { newDamageRoll } from "./roll.ts";

export async function roll(data: DamageTemplate, context: DamageDamageContext): Promise<Maybe<ChatMessage>> {
    const ChatMessagePF2e = getDocumentClass("ChatMessage");
    const outcome = context.outcome ?? null;
    context.createMessage ??= true;

    // Change default roll mode to blind GM roll if the "secret" option is specified
    if (context.options.has("secret")) context.secret = true;
    if (context.secret) context.rollMode ??= game.user.isGM ? "gmroll" : "blindroll";
    context.rollMode = game.settings.get("core", "rollMode");

    const subtitle = outcome
        ? context.sourceType === "attack"
            ? game.i18n.localize(`PF2E.Check.Result.Degree.Attack.${outcome}`)
            : game.i18n.localize(`PF2E.Check.Result.Degree.Check.${outcome}`)
        : null;
    let flavor = await renderTemplate("systems/pf2e/templates/chat/action/header.hbs", {
        title: data.name,
        outcome,
        subtitle
    });

    if (context.traits) {
        interface ToTagsParams {
            labels?: Record<string, string | undefined>;
            descriptions?: Record<string, string | undefined>;
            cssClass: string | null;
            dataAttr: string;
        }
        const toTags = (
            slugs: string[],
            { labels = {}, descriptions = {}, cssClass, dataAttr }: ToTagsParams
        ): string =>
            slugs
                .map((s) => ({ value: s, label: game.i18n.localize(labels[s] ?? "") }))
                .sort((a, b) => a.label.localeCompare(b.label, game.i18n.lang))
                .map((tag) => {
                    const description = descriptions[tag.value] ?? "";

                    const span = document.createElement("span");
                    span.className = "tag";
                    if (cssClass) span.classList.add(cssClass);
                    span.dataset[dataAttr] = tag.value;
                    if (description) span.dataset.tooltip = description;
                    span.innerText = tag.label;

                    return span.outerHTML;
                })
                .join("");

        const traits = toTags(context.traits, {
            labels: CONFIG.PF2E.actionTraits,
            descriptions: CONFIG.PF2E.traitsDescriptions,
            cssClass: null,
            dataAttr: "trait"
        });

        const tagsElem = createHTMLElement("div", {
            classes: ["tags"],
            dataset: { tooltipClass: "pf2e" }
        });
        tagsElem.innerHTML = traits;
        flavor += tagsElem.outerHTML;
        flavor += "\n<hr />";
    }

    // Add breakdown to flavor
    const showBreakdown =
        data.damage.roll?.options.showBreakdown ??
        (game.pf2e.settings.metagame.breakdowns || !!context.self?.actor?.hasPlayerOwner);
    const breakdown = Array.isArray(data.damage.breakdown)
        ? data.damage.breakdown
        : data.damage.breakdown[outcome ?? "success"];
    const breakdownTags = breakdown.map((b) =>
        createHTMLElement("span", {
            classes: ["tag", "tag_transparent"],
            dataset: { visibility: showBreakdown ? null : "gm" },
            children: [b]
        })
    );
    flavor +=
        breakdownTags.length > 0
            ? createHTMLElement("div", { classes: ["tags", "modifiers"], children: breakdownTags }).outerHTML
            : "";

    // Create the damage roll and evaluate. If already created, evalute the one we've been given instead
    const roll = (await data.damage.roll?.evaluate()) ?? null;

    if (roll === null) return null;

    const { self, target } = context;
    const item = self?.item ?? null;
    const targetFlag = target?.actor && target.token ? { actor: target.actor.uuid, token: target.token.uuid } : null;

    const contextFlag: DamageDamageContextFlag = {
        type: context.type,
        sourceType: context.sourceType,
        actor: context.self?.actor?.id ?? null,
        token: context.self?.token?.id ?? null,
        target: targetFlag,
        domains: context.domains ?? [],
        options: Array.from(context.options).sort(),
        contextualOptions: {},
        mapIncreases: context.mapIncreases,
        notes: [],
        secret: context.secret ?? false,
        rollMode: context.rollMode,
        traits: context.traits ?? [],
        skipDialog: context.skipDialog ?? !game.user.settings.showDamageDialogs,
        outcome,
        unadjustedOutcome: context.unadjustedOutcome ?? null
    };

    const messageData: Omit<foundry.documents.ChatMessageSource, "rolls"> & {
        rolls: (string | RollJSON)[];
    } = await roll.toMessage(
        {
            speaker: ChatMessagePF2e.getSpeaker({ actor: self?.actor, token: self?.token }),
            flavor,
            flags: {
                pf2e: {
                    context: contextFlag,
                    target: targetFlag,
                    modifiers: data.modifiers?.flatMap((m) => ("kind" in m ? m.toObject() : [])) ?? [],
                    dice: data.modifiers?.flatMap((m) => ("diceNumber" in m ? m.toObject() : [])) ?? [],
                    origin: item?.getOriginData(),
                    preformatted: "both"
                }
            }
        },
        { create: false }
    );

    // If there is splash damage, include it as an additional roll for separate application
    const splashRolls = await (async (): Promise<RollJSON[]> => {
        const splashInstances = roll.instances
            .map((i) => ({ damageType: i.type, total: i.componentTotal("splash") }))
            .filter((s) => s.total > 0);
        const rolls: RollJSON[] = [];
        for (const splash of splashInstances) {
            const formula = `(${splash.total}[splash])[${splash.damageType}]`;
            const roll = await newDamageRoll(formula).evaluate();
            roll.options.splashOnly = true;
            rolls.push(roll.toJSON());
        }

        return rolls;
    })();

    if (context.createMessage) {
        messageData.rolls.push(...splashRolls);
        return await ChatMessagePF2e.create(messageData, { rollMode: context.rollMode });
    }

    return null;
}
