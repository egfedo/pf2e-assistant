import module from "../module.json" with { type: "json" };

export class AssistantSocket {
    #socket: SocketlibSocket;

    constructor() {
        this.#socket = socketlib.registerModule(module.id)!;
    }
}