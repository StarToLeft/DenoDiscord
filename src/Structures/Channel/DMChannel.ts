import { MessageManager } from "../../Cache/MessageManager.ts";
import { Discord } from "../../Discord.ts";
import Snowflake from "../../Snowflake.ts";
import Message from "../Message.ts";
import User from "../User.ts";

export interface IDMChannel {
    readonly client: Discord.Client;
    readonly createdAt: Date;
    deleted: boolean;
    id: string;
    readonly lastMessage?: Message;
    readonly lastPinAt?: Date;
    messages: MessageManager;
    readonly partial: boolean;
    recipient: User;
    readonly typing: boolean;
}

export default class DMChannel implements IDMChannel {
    constructor(client: Discord.Client, id: string, partial: boolean, recipitent: User) {
        this.client = client;
        this.id = id;
        this.partial = partial;
        this.recipient = recipitent;
        this.createdAt = Snowflake.getSnowflakeDate(id);
        this.deleted = false;
        this.messages = new MessageManager(client, id);
        this.typing = false;
    }

    client: Discord.Client;
    createdAt: Date;
    deleted: boolean;
    id: string;
    lastMessage?: Message;
    lastPinAt?: Date;
    messages: MessageManager;
    partial: boolean;
    recipient: User;
    typing: boolean;

    public send(message: string) {
        this.client.APIChannel.sendMessage(this.id, {content: message})
    }
}