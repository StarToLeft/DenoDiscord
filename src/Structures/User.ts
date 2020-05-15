import { Presence } from "../../mod.ts";
import Snowflake from "../Snowflake.ts";

export interface IUser {
    id: string;

    username: string;
    discriminiator: string;
    tag: string;
    avatar?: string;
    readonly bot?: boolean;
    readonly createdTimestamp?: Date;
    readonly defaultAvatarURL?: string;
    readonly dmChannel?: any; //DMChannel;
    locale?: string;
    readonly partial?: boolean;
    readonly presence: Presence;
    system?: boolean;
}

export default class User implements IUser {
    constructor(id: string, username: string, discriminator: string) {
        this.id = id;

        this.username = username;
        this.discriminiator = discriminator;
        this.tag = username + "#" + discriminator;

        this.createdTimestamp = Snowflake.getSnowflakeDate(this.id);
    }

    id: string;

    username: string;
    discriminiator: string;
    tag: string;
    avatar?: string | undefined;
    bot?: boolean | undefined;
    createdTimestamp?: Date | undefined;
    defaultAvatarURL?: string = "https://cdn.discordapp.com/embed/avatars/4.png";
    dmChannel?: any;
    locale?: string | undefined;
    partial?: boolean | undefined;
    presence: any;
    system?: boolean | undefined;
}
