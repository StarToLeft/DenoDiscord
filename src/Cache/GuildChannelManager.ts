import { Constants } from "../Constants.ts";
import { Discord } from "../Discord.ts";
import Globals from "../Globals.ts";
import GuildChannel, { ChannelTypes } from "../Structures/Channel/GuildChannel.ts";
import TextChannel from "../Structures/Channel/TextChannel.ts";
import Guild from "../Structures/Guild.ts";
import { Logger } from "../Utils/Logger.ts";

interface IChannelManager {
    [id: string]: GuildChannel;
}

export class GuildChannelManager {
    constructor(client: Discord.Client, guildId: string) {
        this.client = client;
        this.guildId = guildId;
    }

    public cache: IChannelManager = {};

    public client: Discord.Client;

    private guildId: string;

    private fetch(id: string): Promise<GuildChannel> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.API_URL}/channels/${id}`, {
                method: "GET",
                headers: {
                    Authorization: "Bot " + Globals.getInstance().Token!,
                    "User-Agent": Constants.USER_AGENT,
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    const data = await res.json();

                    if (data?.message) {
                        Logger.Error("GuildChannelCache: Failed to fetch message, rejecting.");
                        return reject(data);
                    }

                    const type = data?.type as ChannelTypes;
                    // This is just as stupid as the fix in GuildManager.ts, check there, couln't bother rewriting it
                    const guild = <Guild><unknown>await this.client.guilds.resolve(data?.guild_id);

                    // TODO: add all guild channel types

                    switch (type) {
                        case ChannelTypes.GUILD_TEXT: {
                            let textChannel: TextChannel = new TextChannel(this.client, data?.id, type, guild, data?.position, data?.position, data?.name, data?.nsfw, data?.topic);
                            textChannel.partial = false;

                            resolve(textChannel);
                            break;
                        }
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public save(channel: GuildChannel) {
        this.cache[channel.id] = channel;
    }

    public async resolve(id: string): Promise<GuildChannel | null> {
        try {
            let channel = this.cache[id] || null;
            if (channel && !channel.partial) return channel;

            channel = await this.fetch(id);
            return channel;
        } catch (error) {
            Logger.Error(error);
            return null;
        }
    }
}
