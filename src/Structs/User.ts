import { Presence } from "../../mod.ts";
import DMChannel from "./DMChannel.ts";

export interface IUser {
    id: string;

    username: string;
    discriminiator: string;
    avatar?: string;
    readonly bot?: boolean;
    readonly createdTimestamp?: Date;
    readonly defaultAvatarURL?: string;
    readonly dmChannel?: DMChannel;
    locale?: string;
    readonly partial?: boolean;
    readonly presence: Presence;
    system?: boolean;
    tag?: string;
}

export default class User implements IUser {
    constructor(id: string, username: string, discriminator: string) {
        this.id = id;

        this.username = username;
        this.discriminiator = discriminator;
        this.tag = username + "#" + discriminator;
    }

    id: string;

    username: string;
    discriminiator: string;
    avatar?: string | undefined;
    bot?: boolean | undefined;
    createdTimestamp?: Date | undefined;
    defaultAvatarURL?: string | undefined;
    dmChannel?: any;
    locale?: string | undefined;
    partial?: boolean | undefined;
    presence: any;
    system?: boolean | undefined;
    tag?: string | undefined;
}
