import Snowflake from "../Identification/Snowflake.ts";

export interface IUser {
    id: Snowflake;
    Username: string;
    Discriminiator: string;
}

export default class User implements IUser {
    constructor(id: string, username: string, discriminator: string) {
        this.id = new Snowflake(id);

        this.Username = username;
        this.Discriminiator = discriminator;
    }

    id: Snowflake;

    Username: string;
    Discriminiator: string;
}
