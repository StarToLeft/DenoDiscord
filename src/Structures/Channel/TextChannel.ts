import { Discord } from "../../Discord.ts";
import Guild from "../Guild.ts";
import GuildChannel, { ChannelTypes } from "./GuildChannel.ts";

export interface ITextChannel {
    nsfw: boolean;
    topic: string;
}

export default class TextChannel extends GuildChannel implements ITextChannel {
    constructor(
        client: Discord.Client,
        id: string,
        type: ChannelTypes,
        guild: Guild,
        position: number,
        rawPosition: number,
        name: string,
        nsfw: boolean,
        topic: string
    ) {
        super();
        this.client = client;
        this.id = id;
        this.type = type;
        this.guild = guild;
        this.position = position;
        this.rawPosition = position;
        this.name = name;

        this.nsfw = nsfw;
        this.topic = topic;
    }

    id: string;
    type: ChannelTypes;
    guild: Guild;
    position: number;
    rawPosition: number;
    name: string;
    client: Discord.Client;
    partial: boolean = false;

    nsfw: boolean;
    topic: string;

    public send(message: string) {
        this.client.APIChannel.sendMessage(this.id, {content: message})
    }
}
