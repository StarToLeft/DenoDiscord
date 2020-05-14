import { DiscordEvent } from "../DiscordEvents.ts";

export class PresenceUpdateEvent implements DiscordEvent {
    constructor(data: any) {
        this.data = data;
    }

    data: any;
}
