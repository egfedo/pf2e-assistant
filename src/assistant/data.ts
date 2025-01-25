import { ActorPF2e, ChatMessagePF2e, ItemPF2e, ScenePF2e, TokenDocumentPF2e } from "foundry-pf2e";

export interface ActorToken {
    actor: ActorPF2e;
    token: TokenDocumentPF2e<ScenePF2e>;
}

export interface Data {
    trigger: string;
    rollOptions: string[];
    domains?: string[];
    chatMessage?: ChatMessagePF2e;
    roll?: Roll;
    item?: ItemPF2e<ActorPF2e>;
    speaker?: ActorToken;
    target?: ActorToken;
    origin?: ActorToken;
}
