import Snowflake from "../Identification/Snowflake.ts";

export interface IUser {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string,
    flags?: number,
    premium_type?: number,
    public_flags?: number
}

export default class User implements IUser {
    constructor(id: string, username: string, discriminator: string) {
        this.id = new Snowflake(id);
        
        this.username = username;
        this.discriminator = discriminator;
    }

    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string | undefined;
    bot?: boolean | undefined;
    system?: boolean | undefined;
    mfa_enabled?: boolean | undefined;
    locale?: string | undefined;
    verified?: boolean | undefined;
    email?: string | undefined;
    flags?: number | undefined;
    premium_type?: number | undefined;
    public_flags?: number | undefined;
}