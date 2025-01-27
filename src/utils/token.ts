import { ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";

export function hasScene(token: TokenDocumentPF2e): token is TokenDocumentPF2e<ScenePF2e> {
    return token.parent !== null;
}
