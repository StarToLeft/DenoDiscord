import { Discord } from "../../Discord.ts";
import User from "../../Structures/User.ts";
import { Logger } from "../../Utils/Logger.ts";
import { IDiscordEvent } from "../DiscordEvents.ts";


/**
 * Event triggered on discord websocket "READY"
 *
 * @export
 * @class ReadyEvent
 * @implements {IDiscordEvent}
 */
export class ReadyEvent implements IDiscordEvent {
    constructor(client: Discord.Client) {
        this.client = client;
    }

    /**
     * Assign data, because we do need Async for this. 
     * Really, constructors should have async tbh, I'd love that.
     *
     * @param {*} data
     * @returns
     * @memberof ReadyEvent
     */
    async assign(data: any) {
        let user = await this.client.users.resolve(data.user.id);
        
        if (user) {
            this.user = user;
            return user;
        }

        Logger.Error("ReadyEvent: Failed to fetch client.");
    }

    user: User = new User("", "", "");

    client: Discord.Client;
}
