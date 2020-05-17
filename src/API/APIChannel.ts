import { Constants } from "../Constants.ts";
import { Discord } from "../Discord.ts";

export interface APIMessage {
    content?: string;
    tts?: boolean;
    file?: string;
    embed?: any;
    payloadJson?: {};
    allowedMentions?: boolean;
}

export default class APIChannel {
    constructor(client: Discord.Client) {
        this.client = client;
    }

    public client: Discord.Client;

    public async sendMessage(channelId: string, APIMessage: APIMessage): Promise<unknown> {
        return new Promise((resolve, reject) => {
            let body = {};

            if (APIMessage.content) {
                body = Object.assign(body, { content: APIMessage.content });
            }

            if (APIMessage.tts) {
                body = Object.assign(body, { tts: APIMessage.tts });
            }

            if (APIMessage.file) {
                body = Object.assign(body, { file: APIMessage.file });
            }

            if (APIMessage.payloadJson) {
                body = Object.assign(body, { payload_json: APIMessage.payloadJson });
            }

            if (APIMessage.allowedMentions) {
                body = Object.assign(body, { allowed_mentions: APIMessage.allowedMentions });
            }

            fetch(`${Constants.API_URL}/channels/${channelId}/messages`, {
                method: "POST",
                headers: {
                    Authorization: "Bot " + this.client.token!,
                    "User-Agent": Constants.USER_AGENT,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
