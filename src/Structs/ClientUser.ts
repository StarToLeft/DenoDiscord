import { Discord } from "../Discord.ts";
import User from "./User.ts";

export interface IClientUser {
    id: string;
    user: User;
    client: Discord.Client;
}

export default class ClientUser implements IClientUser {
    constructor(user: User, client: Discord.Client) {
        this.user = user;
        this.id = this.user.id;
        this.client = client;
    }

    id: string;
    user: User;
    client: Discord.Client;
}
