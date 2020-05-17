import DMChannel from "./Channel/DMChannel.ts";
import TextChannel from "./Channel/TextChannel.ts";
import Guild from "./Guild.ts";
import GuildMember from "./GuildMember.ts";
import User from "./User.ts";

export enum MessageType {
    "DEFAULT",
    "RECIPIENT_ADD",
    "RECIPIENT_REMOVE",
    "CALL",
    "CHANNEL_NAME_CHANGE",
    "CHANNEL_ICON_CHANGE",
    "CHANNEL_PINNED_MESSAGE",
    "GUILD_MEMBER_JOIN",
    "USER_PREMIUM_GUILD_SUBSCRIPTION",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3",
    "CHANNEL_FOLLOW_ADD",
    "GUILD_DISCOVERY_DISQUALIFIED",
    "GUILD_DISCOVERY_REQUALIFIED",
}

export interface IMessage {
    id: string;
    channel: DMChannel | TextChannel;
    guild?: Guild;
    author: User;
    member?: GuildMember;
    content: string;
    timestamp: Date;
    editedTimestamp?: Date;
    tts: boolean;
    mentionEveryone: boolean;
    mentions?: User[];
    //mentionRoles?: Role[];
    //mentionChannels?: Channel[];
    //attachments?: Attachment[];
    //embeds?: Embed[];
    //reactions?: Reaction[];
    nounce?: boolean;
    pinned: boolean;
    webhookId?: string;
    type: MessageType;
    //activity?: MessageActivity;
    //application?: Application;
    flags?: number; // Message flags

    partial: boolean;
}

export default class Message implements IMessage{
    constructor(id: string, channel: DMChannel | TextChannel, author: User, content: string, timestamp: Date, tts: boolean, mentionEveryone: boolean, pinned: boolean, type: number | MessageType, partial: boolean) {
        this.id = id;
        this.channel = channel;
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.tts = tts;
        this.mentionEveryone = mentionEveryone;
        this.pinned = pinned;
        this.type = type;
        this.partial = partial;
    }

    id: string;
    channel: DMChannel | TextChannel;
    guildId?: string | undefined;
    author: User;
    member?: GuildMember | undefined;
    content: string;
    timestamp: Date;
    editedTimestamp?: Date | undefined;
    tts: boolean;
    mentionEveryone: boolean;
    mentions?: User[] | undefined;
    nounce?: boolean | undefined;
    pinned: boolean;
    webhookId?: string | undefined;
    type: MessageType;
    flags?: number | undefined;

    partial: boolean;
}