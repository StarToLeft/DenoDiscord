import { Constants } from "../Constants.ts";
import { Discord } from "../Discord.ts";
import Globals from "../Globals.ts";
import Message from "../Structures/Message.ts";
import { Logger } from "../Utils/Logger.ts";

interface IMessageManager {
    [id: string]: Message;
}

export class MessageManager {
    constructor(client: Discord.Client, channelId: string) {
        this.client = client;
        this.channelId = channelId;
    }

    public cache: IMessageManager = {};

    public client: Discord.Client;

    public channelId: string;

    private fetch(id: string): Promise<Message> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.API_URL}/channels/${this.channelId}/messages/${id}`, {
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
                        Logger.Error("MessageCache: Failed to fetch message, rejecting.");
                        return reject(data);
                    }

                    console.log(data);

                    //let message: Message = new Message();

                    //if (!this.cache[id])
                    //    this.save(message);

                    //resolve(message);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public save(message: Message) {
        this.cache[message.id] = message;
    }

    public async resolve(id: string): Promise<Message | null> {
        try {
            let message = this.cache[id] || null;
            if (message && !message.partial) return message;

            message = await this.fetch(id);
            return message;
        } catch (error) {
            Logger.Error(error);
            return null;
        }
    }
}
