import { htmlClosest } from "./dom.ts";

export function getMessage(event: Maybe<Event>) {
    const element = htmlClosest<HTMLLIElement>(event?.target, "li[data-message-id]");
    const messageId = element?.dataset.messageId ?? "";
    const message = game.messages.get(messageId);
    return element && message ? { element, message } : { element: null, message: null };
}
