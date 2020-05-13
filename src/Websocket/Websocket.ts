import * as WS from "https://deno.land/std/ws/mod.ts";
import Constants from "../Constants.ts";
import { IsJsonString } from "../Utils/Json.ts";
import Logger from "../Utils/Logger.ts";

export default class Websocket {
    constructor(token: string) {
        this.Token = token;
    }

    // Websocket data
    public ws: WS.WebSocket | undefined;

    public KeepAlive: boolean = true;

    // Identifier
    public Token: string;

    /**
     * Connect to Discord Gateway
     *
     * @memberof Websocket
     */
    async Connect() {
        Logger.Log("Websocket: Connecting to websocket")

        this.ws = await WS.connectWebSocket(Constants.GATEWAY_URL);
        await this.WebsocketLoop();
    }

    // Last response recieved from Discord
    protected lastResponse: any = {};

    // Heartbeat interval
    protected nextSendHeartbeat: number = 0;

    /**
     * Discord websocket loop
     *
     * @memberof Websocket
     */
    async WebsocketLoop() {
        Logger.Log("Websocket: Starting main loop")

        let interval = 40000;

        if (this.ws) {
            setInterval(async () => {
                if (!this.ws) return;

                if (this.nextSendHeartbeat < new Date().getTime()) {
                    await this.SendHeartBeat();
                    this.nextSendHeartbeat = new Date().getTime() + interval;
                }

                for await (const msg of this.ws) {
                    if (!IsJsonString(msg.toString())) {
                        this.lastResponse = msg;
                    } else {
                        this.lastResponse = JSON.parse(msg.toString());
                    }

                    if (this.lastResponse?.op == Constants.OPCODES.HELLO) {
                        let _interval = this.lastResponse?.d?.heartbeat_interval;
                        interval = _interval;

                        await this.VerifyClient();
                    }

                    Logger.Log(this.lastResponse);
                }

                if (!this.KeepAlive) {
                    Logger.Log("Closing websocket")
                    return this.ws?.close();
                }
            }, 10);
        }
    }

    /**
     * Send heartbeat
     *
     * @param {number} interval
     * @returns
     * @memberof Websocket
     */
    async SendHeartBeat() {
        Logger.Log("Websocket: Keep alive")
        // Heartbeat
        let s = this.lastResponse?.s ?? null;

        this.ws?.send(
            JSON.stringify({
                op: Constants.OPCODES.HEARTBEAT,
                d: s,
            })
        );
    }

    /**
     * Verify the client
     *
     * @param {string} Token
     * @memberof Websocket
     */
    async VerifyClient() {
        // Should be moved to client-manager later

        // Check if we are infact connected
        if (this.ws) {
            Logger.Log("Websocket: Starting verification");
            this.ws?.send(
                await this.getWebsocketString({
                    op: Constants.OPCODES.IDENTIFY,
                    d: {
                        token: this.Token,
                        properties: {
                            $os: "windows",
                            $browser: "firefox",
                            $device: "denodiscord",
                        },
                        compress: false,
                        large_threshold: 250,
                        //guild_subscriptions: false,
                        //shard: [0, 1],
                        // This intent represents 1 << 0 for GUILDS, 1 << 1 for GUILD_MEMBERS, and 1 << 2 for GUILD_BANS
                        // This connection will only receive the events defined in those three intents
                        //intents: 7,
                    },
                })
            );
        } else {
            return Error("VerifyClient: Fatal error, not connected to websocket.");
        }
    }

    async getWebsocketString<T>(object: T) {
        return JSON.stringify(object);
    }
}
