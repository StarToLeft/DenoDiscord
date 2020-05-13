import { Discord } from "../Discord.ts";
import Snowflake from "../Identification/Snowflake.ts";

export interface IClientUser {
    id: Snowflake;
    avatar?: string,
    bot?: boolean,
    client: Discord.Client
    
}

export default class ClientUser implements IClientUser {
    constructor(id: string, client: Discord.Client) {
        this.id = new Snowflake(id);

        this.client = client;
    }

    id: Snowflake;
    avatar?: string | undefined;
    bot?: boolean | undefined;
    client: Discord.Client;
}