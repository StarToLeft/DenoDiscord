export enum GatewayOpcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    STATUS_UPDATE = 3,
    VOICE_STATE_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
}

export interface GatewayPayload {
    op: GatewayOpcode;
    d: any;
    s?: number;
    t?: DiscordDispatchEvents;
}

export enum Intent {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_BANS = 1 << 2,
    GUILD_EMOJIS = 1 << 3,
    GUILD_INTEGRATIONS = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_VOICE_STATES = 1 << 7,
    GUILD_PRESENCES = 1 << 8,
    GUILD_MESSAGES = 1 << 9,
    GUILD_MESSAGE_REACTIONS = 1 << 10,
    GUILD_MESSAGE_TYPING = 1 << 11,
    DIRECT_MESSAGES = 1 << 12,
    DIRECT_MESSAGE_REACTIONS = 1 << 13,
    DIRECT_MESSAGE_TYPING = 1 << 14,
}

export type Presence = "online" | "dnd" | "idle" | "invisible" | "offline";

export interface DiscordEvents {
    DIRECT_MESSAGES:
        | "CHANNEL_CREATE"
        | "CHANNEL_UPDATE"
        | "CHANNEL_DELETE"
        | "CHANNEL_PINS_UPDATE";
    DIRECT_MESSAGE_REACTIONS:
        | "MESSAGE_REACTION_ADD"
        | "MESSAGE_REACTION_REMOVE"
        | "MESSAGE_REACTION_REMOVE_ALL"
        | "MESSAGE_REACTION_REMOVE_EMOJI";
    DIRECT_MESSAGE_TYPING: "TYPING_START";

    GUILDS:
        | "GUILD_CREATE"
        | "GUILD_DELETE"
        | "GUILD_ROLE_CREATE"
        | "GUILD_ROLE_UPDATE"
        | "GUILD_ROLE_DELETE"
        | "CHANNEL_CREATE"
        | "CHANNEL_UPDATE"
        | "CHANNEL_DELETE"
        | "CHANNEL_PINS_UPDATE";

    GUILD_MESSAGES: "MESSAGE_CREATE" | "MESSAGE_UPDATE" | "MESSAGE_DELETE";
    GUILD_MESSAGE_REACTIONS:
        | "MESSAGE_REACTION_ADD"
        | "MESSAGE_REACTION_REMOVE"
        | "MESSAGE_REACTION_REMOVE_ALL"
        | "MESSAGE_REACTION_REMOVE_EMOJI";
    GUILD_MESSAGE_TYPING: "TYPING_START";

    GUILD_PRESENCES: "PRESENCE_UPDATE";

    GUILD_MEMBERS: "GUILD_MEMBER_ADD" | "GUILD_MEMBER_REMOVE" | "GUILD_MEMBER_UPDATE";
    GUILD_BANS: "GUILD_BAN_ADD" | "GUILD_BAN_REMOVE";

    GUILD_EMOJIS: "GUILD_EMOJIS_UPDATE";

    GUILD_INTEGRATIONS: "GUILD_INTEGRATIONS_UPDATE";

    GUILD_WEBHOOKS: "WEBHOOKS_UPDATE";

    GUILD_INVITES: "INVITE_CREATE" | "INVITE_DELETE";

    GUILD_VOICE_STATES: "VOICE_STATE_UPDATE";
}
export type DispatchEvent_Passthrough =
    | "GUILD_MEMBERS_CHUNK"
    | "MESSAGE_DELETE_BULK"
    | "USER_UPDATE"
    | "VOICE_SERVER_UPDATE";

export type AvailableDispatchEvent<T extends (keyof DiscordEvents)[]> =
    | DiscordEvents[keyof Pick<DiscordEvents, T[number]>]
    | DispatchEvent_Passthrough;

export type DiscordDispatchEvents =
    | DiscordEvents[keyof DiscordEvents]
    | "READY"
    | "RESUMED"
    | "RECONNECT"
    | "INVALID_SESSION";