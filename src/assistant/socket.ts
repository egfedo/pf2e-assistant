import {
    ActorPF2e,
    ChatMessageFlagsPF2e,
    ChatMessagePF2e,
    CheckDC,
    CheckDCReference,
    ConditionSlug,
    ItemPF2e,
    ItemSourcePF2e,
    SaveType,
    ScenePF2e,
    TokenDocumentPF2e,
} from "foundry-pf2e";
import { Utils } from "utils.ts";
import module from "../../module.json" with { type: "json" };

export class Socket {
    #socket: SocketlibSocket;

    constructor() {
        this.#socket = socketlib.registerModule(module.id)!;

        this.#socket.register("addEmbeddedItem", this.#addEmbeddedItem);
        this.#socket.register("createEmbeddedItem", this.#createEmbeddedItem);
        this.#socket.register("deleteEmbeddedItem", this.#deleteEmbeddedItem);
        this.#socket.register("updateEmbeddedItem", this.#updateEmbeddedItem);

        this.#socket.register("decreaseCondition", this.#decreaseCondition);
        this.#socket.register("increaseCondition", this.#increaseCondition);
        this.#socket.register("toggleCondition", this.#toggleCondition);
        this.#socket.register("setCondition", this.#setCondition);

        this.#socket.register("rollSave", this.#rollSave);

        this.#socket.register("deleteChatMessage", this.#deleteChatMessage);

        this.#socket.register("promptChoice", this.#promptChoice);
    }

    async #executeAsActor<T>(actor: ActorPF2e, handler: string | Function, ...args: any[]): Promise<Maybe<T>> {
        const primaryUser = Utils.Actor.getPrimaryUser(actor);

        if (primaryUser) {
            return this.#socket.executeAsUser<Maybe<T>>(handler, primaryUser.id, ...args);
        }

        return undefined;
    }

    async addEmbeddedItem(actor: ActorPF2e, itemUuid: ItemUUID, data?: PreCreate<ItemSourcePF2e>): Promise<Maybe<ItemUUID>> {
        if (!actor.canUserModify(game.user, "update")) {
            return await this.#executeAsActor(actor, "addEmbeddedItem", actor.uuid, itemUuid, data);
        }

        const item = await fromUuid<ItemPF2e>(itemUuid);

        if (item) {
            const itemSource = !data ? item.toObject() : foundry.utils.mergeObject(item.toObject(), data);
            const createdItem = await actor.createEmbeddedDocuments("Item", [itemSource]);
            if (createdItem.length !== 0) return createdItem[0].uuid;
        }

        return undefined;
    }

    async #addEmbeddedItem(actorUuid: ActorUUID, itemUuid: ItemUUID, data?: PreCreate<ItemSourcePF2e>): Promise<Maybe<ItemUUID>> {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return undefined;

        return await game.assistant.socket.addEmbeddedItem(actor, itemUuid, data);
    }

    async createEmbeddedItem(actor: ActorPF2e, data: PreCreate<ItemSourcePF2e>): Promise<Maybe<ItemUUID>> {
        if (!actor.canUserModify(game.user, "update")) {
            return await this.#executeAsActor(actor, "createEmbeddedItem", actor.uuid, data);
        }

        const createdItem = await actor.createEmbeddedDocuments("Item", [data]);
        if (createdItem.length !== 0) return createdItem[0].uuid;

        return undefined;
    }

    async #createEmbeddedItem(actorUuid: ActorUUID, data: PreCreate<ItemSourcePF2e>): Promise<Maybe<ItemUUID>> {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return undefined;

        return await game.assistant.socket.createEmbeddedItem(actor, data);
    }

    async deleteEmbeddedItem(item: ItemPF2e) {
        if (!item.parent) return;

        if (!item.parent.canUserModify(game.user, "update")) {
            await this.#executeAsActor(item.parent, "deleteEmbeddedItem", item.uuid);
            return;
        }

        await item.delete();
    }

    async #deleteEmbeddedItem(itemUuid: ItemUUID) {
        let item = await fromUuid<ItemPF2e>(itemUuid);
        if (!item) return;

        await game.assistant.socket.deleteEmbeddedItem(item);
    }

    async updateEmbeddedItem(item: ItemPF2e, data: Record<string, unknown>) {
        if (!item.parent) return;

        if (!item.parent.canUserModify(game.user, "update")) {
            await this.#executeAsActor(item.parent, "updateEmbeddedItem", item.uuid);
            return;
        }

        await item.update(data);
    }

    async #updateEmbeddedItem(itemUuid: ItemUUID, data: Record<string, unknown>) {
        let item = await fromUuid<ItemPF2e>(itemUuid);
        if (!item) return;

        await game.assistant.socket.updateEmbeddedItem(item, data);
    }

    async decreaseCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, options?: { forceRemove: boolean }) {
        if (!actor.canUserModify(game.user, "update")) {
            await this.#executeAsActor(actor, "decreaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.decreaseCondition(conditionSlug, options);
    }

    async #decreaseCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, options?: { forceRemove: boolean }) {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return;

        await game.assistant.socket.decreaseCondition(actor, conditionSlug, options);
    }

    async increaseCondition(
        actor: ActorPF2e,
        conditionSlug: ConditionSlug,
        options?: { max?: number; value?: number | null },
    ) {
        if (!actor.canUserModify(game.user, "update")) {
            await this.#executeAsActor(actor, "increaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.increaseCondition(conditionSlug, options);
    }

    async #increaseCondition(
        actorUuid: ActorUUID,
        conditionSlug: ConditionSlug,
        options?: { max?: number; value?: number | null },
    ) {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return;

        await game.assistant.socket.increaseCondition(actor, conditionSlug, options);
    }

    async toggleCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, options?: { active?: boolean }) {
        if (!actor.canUserModify(game.user, "update")) {
            await this.#executeAsActor(actor, "toggleCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.toggleCondition(conditionSlug, options);
    }

    async #toggleCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, options?: { active?: boolean }) {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return;

        await game.assistant.socket.toggleCondition(actor, conditionSlug, options);
    }

    async setCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, value: number): Promise<Maybe<number>> {
        if (!actor.canUserModify(game.user, "update")) {
            return await this.#executeAsActor(actor, "setCondition", actor.uuid, conditionSlug, value);
        }

        if (conditionSlug === "persistent-damage") return;

        const condition = actor.getCondition(conditionSlug);
        const conditionValue = condition?.value ?? 0;
        if (conditionValue < value) {
            await actor.increaseCondition(conditionSlug, { value, max: value });
        }

        return conditionValue;
    }

    async #setCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, value: number): Promise<Maybe<number>> {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return;

        return await game.assistant.socket.setCondition(actor, conditionSlug, value);
    }

    async rollSave(actor: ActorPF2e, save: SaveType, args: SocketTypes.Save.RollParameters) {
        if (!actor.canUserModify(game.user, "update")) {
            await this.#executeAsActor(actor, "rollSave", actor.uuid, save, {
                origin: args.origin?.uuid,
                dc: args.dc,
                extraRollOptions: args.extraRollOptions,
            });
            return;
        }

        await actor.saves?.[save]?.roll(args);
    }

    async #rollSave(actorUuid: ActorUUID, save: SaveType, args: SocketTypes.Save.SerializedRollParameters) {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return;

        await game.assistant.socket.rollSave(actor, save, {
            origin: args.origin ? await fromUuid<ActorPF2e>(args.origin) : undefined,
            dc: args.dc,
            extraRollOptions: args.extraRollOptions,
        });
    }

    async deleteChatMessage(chatMessage: ChatMessagePF2e) {
        if (!chatMessage.canUserModify(game.user, "delete")) {
            await this.#socket.executeAsGM("deleteChatMessage", chatMessage.uuid);
        }
        if (chatMessage.flags["pf2e-assistant"]?.process !== false) return;

        await chatMessage.delete();
    }

    async #deleteChatMessage(chatMessageUuid: ChatMessageUUID) {
        let chatMessage = await fromUuid<ChatMessagePF2e>(chatMessageUuid);
        if (!chatMessage) return;

        await game.assistant.socket.deleteChatMessage(chatMessage);
    }

    async promptChoice(
        actor: ActorPF2e,
        param: SocketTypes.Prompt.ChoiceParameters,
    ): Promise<Maybe<ChatMessageUUID>> {
        if (!actor.canUserModify(game.user, "update")) {
            return await this.#executeAsActor(actor, "promptChoice", actor.uuid, {
                speaker: { actor: param.speaker.actor.uuid, token: param.speaker.token.uuid },
                item: param.item ? param.item.uuid : undefined,
                target: param.target ? { actor: param.target.actor.uuid, token: param.target.token.uuid } : undefined,
                data: param.data,
            });
        }

        const flags: DeepPartial<ChatMessageFlagsPF2e> = {
            core: {
                canPopout: false,
            },
            pf2e: {
                context: {
                    target: param.target
                        ? { actor: param.target.actor.uuid, token: param.target.token.uuid }
                        : undefined,
                },
                origin: param.item ? param.item.getOriginData() : undefined,
                casting:
                    param.item?.isOfType("spell") && param.item.spellcasting?.statistic
                        ? {
                            id: param.item.spellcasting.id,
                            tradition: param.item.spellcasting.tradition ?? param.item.traditions.first() ?? "arcane",
                            embeddedSpell: param.item.parentItem ? param.item.toObject() : undefined,
                        }
                        : undefined,
            },
            "pf2e-assistant": {
                process: false,
            },
        };

        let chatMessage = await ChatMessage.create({
            content: await renderTemplate("modules/pf2e-assistant/templates/chat/prompt-choice.hbs", param.data),
            flags,
            speaker: ChatMessage.getSpeaker(param.speaker),
            whisper: game.users.filter((user) => param.speaker.actor.canUserModify(user, "update")),
        });
        return chatMessage?.uuid;
    }

    async #promptChoice(
        actorUuid: ActorUUID,
        param: SocketTypes.Prompt.SerializedChoiceParameters,
    ): Promise<Maybe<ChatMessageUUID>> {
        let actor = await fromUuid<ActorPF2e>(actorUuid);
        if (!actor) return undefined;

        const speaker = {
            actor: await fromUuid<ActorPF2e>(param.speaker.actor),
            token: await fromUuid<TokenDocumentPF2e<ScenePF2e>>(param.speaker.token),
        };
        const item = param.item ? await fromUuid<ItemPF2e>(param.item) : undefined;
        const target = param.target
            ? {
                actor: await fromUuid<ActorPF2e>(param.target.actor),
                token: await fromUuid<TokenDocumentPF2e<ScenePF2e>>(param.target.token),
            }
            : undefined;
        const data = param.data;

        if (Utils.Actor.isActorToken(speaker)) {
            return await game.assistant.socket.promptChoice(actor, {
                speaker,
                item: item ? item : undefined,
                target: target && Utils.Actor.isActorToken(target) ? target : undefined,
                data,
            });
        }
        return undefined;
    }
}

namespace SocketTypes {
    export namespace Prompt {
        export interface SerializedChoiceParameters {
            speaker: { actor: ActorUUID; token: TokenDocumentUUID };
            item?: ItemUUID;
            target?: { actor: ActorUUID; token: TokenDocumentUUID };
            data: ChoiceData;
        }

        export interface ChoiceParameters {
            speaker: { actor: ActorPF2e; token: TokenDocumentPF2e<ScenePF2e> };
            item?: ItemPF2e;
            target?: { actor: ActorPF2e; token: TokenDocumentPF2e<ScenePF2e> };
            data: ChoiceData;
        }

        export interface ChoiceData {
            description: string;
            choices: Choice[];
        }

        export interface Choice {
            label: string;
            value: string;
        }
    }

    export namespace Save {
        export interface RollParameters {
            origin?: Maybe<ActorPF2e>;
            dc?: CheckDC | CheckDCReference | number | null;
            extraRollOptions?: string[];
        }

        export interface SerializedRollParameters {
            origin?: ActorUUID;
            dc?: CheckDC | CheckDCReference | number | null;
            extraRollOptions?: string[];
        }
    }
}
