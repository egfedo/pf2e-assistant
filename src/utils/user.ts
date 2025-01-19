import { ScenePF2e, TokenDocumentPF2e, TokenPF2e, UserPF2e } from "foundry-pf2e";

export function getTargets(user: UserPF2e = game.user): TokenPF2e<TokenDocumentPF2e<ScenePF2e>>[] {
    return Array.from(user.targets);
}
