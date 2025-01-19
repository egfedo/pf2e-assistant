import { ActorPF2e, CheckDC, ScenePF2e, TokenDocumentPF2e, UserPF2e } from "foundry-pf2e";

export function getClassDC(actor: ActorPF2e): CheckDC | number | undefined {
    if (actor.isOfType("character")) {
        return !actor.classDC
            ? undefined
            : {
                  label: `${actor.classDC.label} DC`,
                  value: actor.classDC.dc.value,
              };
    }

    if (actor.isOfType("npc")) {
        return actor.attributes.classDC.value;
    }

    return undefined;
}

export function getPrimaryUser(actor: ActorPF2e): UserPF2e | null {
    const activeUsers = game.users.filter((user) => user.active);
    const primaryPlayer = actor.isToken ? null : activeUsers.find((user) => user.character?.id === actor.id);
    if (primaryPlayer) return primaryPlayer;

    const activeUpdaters = activeUsers.filter((user) => actor.canUserModify(user, "update"));
    if (activeUpdaters.length === 1) return activeUpdaters[0];

    return game.users.activeGM;
}

export interface ActorToken {
    actor: ActorPF2e;
    token: TokenDocumentPF2e<ScenePF2e>;
}

export function isActorToken(data: { actor: Maybe<ActorPF2e>; token: Maybe<TokenDocumentPF2e> }): data is ActorToken {
    if (data.actor && data.token && data.token.parent) {
        return true;
    }
    return false;
}
