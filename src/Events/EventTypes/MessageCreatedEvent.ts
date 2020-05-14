import { Discord } from "../../Discord.ts";
import { IDiscordEvent } from "../DiscordEvents.ts";

export class MessageCreatedEvent implements IDiscordEvent {
    constructor(data: any, client: Discord.Client) {
        this.data = data;
        this.client = client;
    }

    data: any;
    client: Discord.Client;
}
