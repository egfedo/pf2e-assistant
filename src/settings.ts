import { ApplicationRenderOptions } from "foundry-pf2e/foundry/client-esm/applications/_types.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

export class AssistantSettings extends HandlebarsApplicationMixin(ApplicationV2) {
    static override DEFAULT_OPTIONS = {
        id: "pf2e-assistant-settings",
        tag: "form",
        window: {
            contentClasses: ["standard-form"],
            title: "PF2e Assistant - Automation Settings",
        },
        position: {
            width: 480,
            height: 500,
        },
        form: {
            closeOnSubmit: true,
            handler: AssistantSettings.#onSubmit
        },
    };

    static override PARTS = {
        form: {
            template: "modules/pf2e-assistant/templates/apps/settings.hbs",
            scrollable: [""]
        },
        footer: {
            template: "templates/generic/form-footer.hbs"
        }
    };

    protected override async _prepareContext(_options: ApplicationRenderOptions) {
        return {
            files: game.assistant.storage.getFiles(),
            buttons: [
                { type: "submit", icon: "fa-solid fa-save", label: "Save Changes" }
            ]
        };
    }

    static async #onSubmit(_event: SubmitEvent, form: HTMLFormElement, _formData: FormDataExtended) {
        var disabledFiles: string[] = [];

        var inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.type === "checkbox" && input.checked === false) {
                disabledFiles.push(input.name);
            }
        }

        if (!disabledFiles.equals(game.settings.get("pf2e-assistant", "disabledFiles"))) {
            await game.settings.set("pf2e-assistant", "disabledFiles", disabledFiles);
            SettingsConfig.reloadConfirm({ world: true });
        }
    }
}