import { DiscordEvent } from "../DiscordEvents.ts";

export class MessageCreatedEvent implements DiscordEvent {
    constructor(data: any) {
        this.data = data;
    }

    data: any;
}
