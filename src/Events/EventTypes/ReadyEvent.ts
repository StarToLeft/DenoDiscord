import { DiscordEvent } from "../DiscordEvents.ts";

export class ReadyEvent implements DiscordEvent {
    constructor(data: any) {
        this.data = data;
    }

    data: any;
}
