import { Discord } from "../../Discord.ts";
import ClientUser from "../../Structs/ClientUser.ts";
import User from "../../Structs/User.ts";
import { Logger } from "../../Utils/Logger.ts";
import { IDiscordEvent } from "../DiscordEvents.ts";

export class ReadyEvent implements IDiscordEvent {
    constructor(client: Discord.Client) {
        this.clientUser = new ClientUser(new User("", "", ""), client);
        this.client = client;
    }

    async assign(data: any) {
        this.clientUser = data;
        let user = await this.client.UserCache.resolve(data.user.id);
        if (user) {
            let clientUser = new ClientUser(user, this.client);

            this.client.clientUser = clientUser;
            this.clientUser = clientUser;
            return clientUser;
        }

        Logger.Error("ReadyEvent: Failed to fetch client.");
    }

    clientUser: ClientUser;

    client: Discord.Client;
}
