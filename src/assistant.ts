import * as _Assistant from "./assistant/index.ts";

export namespace Assistant {
    export import createReroll = _Assistant.createReroll;
    export import Socket = _Assistant.Socket;
    export import Storage = _Assistant.Storage;
    export type Action = _Assistant.Action;
    export type Data = _Assistant.Data;
    export type Reroll = _Assistant.Reroll;
}
