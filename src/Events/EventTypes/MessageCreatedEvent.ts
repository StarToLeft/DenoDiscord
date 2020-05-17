import { Discord } from "../../Discord.ts";
import DMChannel from "../../Structures/Channel/DMChannel.ts";
import { ChannelTypes } from "../../Structures/Channel/GuildChannel.ts";
import TextChannel from "../../Structures/Channel/TextChannel.ts";
import Guild from "../../Structures/Guild.ts";
import Message from "../../Structures/Message.ts";
import User from "../../Structures/User.ts";
import { IDiscordEvent } from "../DiscordEvents.ts";

export class MessageCreatedEvent implements IDiscordEvent {
    constructor(client: Discord.Client) {
        this.message = new Message(
            "",
            new TextChannel(
                client,
                "",
                ChannelTypes.DM,
                new Guild(client, "", "", "", 0, 0, 0, new User("", "", "")),
                0,
                0,
                "",
                false,
                ""
            ),
            new User("", "", ""),
            "",
            new Date(),
            false,
            false,
            false,
            0,
            false
        );

        this.client = client;
    }

    public async assign(data: any) {
        // Warning, only do this if you are 100% sure the guild, channel and user exist
        const guild = <Guild><unknown>await this.client.guilds.resolve(data?.guild_id);
        const channel = <TextChannel | DMChannel><unknown>await guild.channels.resolve(data?.channel_id);
        const author = <User><unknown>await this.client.users.resolve(data?.author?.id);

        this.message = new Message(data?.id, channel, author, data?.content, data?.timestamp, data?.tts, data?.mention_everyone, data?.pinned, data?.type, false);
    }

    message: Message;
    client: Discord.Client;
}
