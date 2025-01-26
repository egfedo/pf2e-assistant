import { AutomationList } from "apps/automation-list.ts";

Hooks.once("init", () => {
    game.settings.registerMenu("pf2e-assistant", "automationMenu", {
        name: "Automations",
        label: "Manage Automations",
        hint: "Allows you to manage which automations are enabled/disabled.",
        icon: "fas fa-gears",
        type: AutomationList,
        restricted: true
    });

    game.settings.register("pf2e-assistant", "disabledFiles", {
        name: "Disabled Automations",
        scope: "world",
        config: false,
        type: Array,
        default: []
    });

    game.settings.register("pf2e-assistant", "initialized", {
        name: "Initialized",
        scope: "world",
        config: false,
        type: Boolean,
        default: false
    });
});
