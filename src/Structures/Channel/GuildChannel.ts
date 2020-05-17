import { Discord } from "../../Discord.ts";
import Guild from "../Guild.ts";

export enum ChannelTypes {
    "GUILD_TEXT",
    "DM",
    "GUILD_VOICE",
    "GROUP_DM",
    "GUILD_CATEGORY",
    "GUILD_NEWS",
    "GUILD_STORE",
}

export interface IGuildChannel {
    id: string;
    type: ChannelTypes;
    guild: Guild;
    position: number;
    rawPosition: number;
    //permissionOverwrites: any[]; // TODO: Fix real permission overwrites object type
    name: string;
    client: Discord.Client;
    //members: GuildMemberManager; Members that can see the channel
    partial: boolean;
}

export default abstract class GuildChannel implements IGuildChannel {
    abstract id: string;
    abstract type: ChannelTypes;
    abstract guild: Guild;
    abstract position: number;
    abstract rawPosition: number;
    abstract name: string;
    abstract client: Discord.Client;
    abstract partial: boolean;
}
