import User from "./User.ts";

export interface IGuild {
    id: string;
    name: string;
    owner?: User;
    region: string;
    afkChannel: VoiceChannel;
    afkTimeout: number;
    verificationLevel: number;
    roles?: GuildRole[];
    emojis?: GuildEmoji[];
    features?: GuildFeatures[];
    joinedAt?: Date; // ISO8601 timestamp
    large?: boolean;
    unavailable?: boolean;
    memberCount: number;
    members: GuildMemberManager;
    maxMembers?: number;
    channels: GuildChannelManager;
    presences: PresencesManager;
    description?: string;
    vanityUrl?: string;
    premiumTier?: number;
    premiumSubscriptionCount?: number;
}

export default class Guild implements IGuild {
    constructor(id: string, name: string, region: string, afkTimeout: number, afkChannel: VoiceChannel, verificationLevel: number, memberCount: number, guildMemberManager: GuildMemberManager) {
        this.id = id;
        this.name = name;
        this.region = region;
        this.afkChannel = afkChannel;
        this.afkTimeout = afkTimeout;
        this.verificationLevel = verificationLevel;
        this.memberCount = memberCount;
        this.memberCount = guildMemberManager; 
    }

    id: string;
    name: string;
    owner?: User | undefined;
    region: string;
    afkChannel: VoiceChannel;
    afkTimeout: number;
    verificationLevel: number;
    roles?: GuildRole[];
    emojis?: GuildEmoji[];
    features?: GuildFeatures[];
    joinedAt?: Date | undefined;
    large?: boolean | undefined;
    unavailable?: boolean | undefined;
    memberCount: number;
    members: GuildMemberManager;
    maxMembers?: number | undefined;
    channels: GuildChannelManager;
    presences: PresenceManager;
    description?: string | undefined;
    vanityUrl?: string | undefined;
    premiumTier?: number | undefined;
    premiumSubscriptionCount?: number | undefined;

}