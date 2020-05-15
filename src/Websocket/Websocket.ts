import * as WS from "https://deno.land/std/ws/mod.ts";
import { Constants } from "../Constants.ts";
import EventEmitter from "../Events/EventEmitter.ts";
import { Logger } from "../Utils/Logger.ts";

export default class Websocket {
    constructor(callback: EventEmitter) {
        this.socketDataCallback = callback;
    }

    // Websocket data
    public ws: WS.WebSocket | undefined;

    public KeepAlive: boolean = true;

    // Identifier
    public Token: string = "";

    public sessionId: string | undefined;

    /**
     * Connect to Discord Gateway
     *
     * @memberof Websocket
     */
    async Connect(token: string) {
        this.Token = token;

        Logger.Log("Websocket: Connecting to websocket");

        Logger.Time("Websocket.Connect-Verify");

        this.ws = await WS.connectWebSocket(Constants.GATEWAY_URL);
        await this.WebsocketLoop();
    }

    private s: number | null = null;

    private socketDataCallback: EventEmitter;

    /**
     * Discord websocket loop
     *
     * @memberof Websocket
     */
    async WebsocketLoop() {
        Logger.Log("Websocket: Starting main loop");

        let interval = 40000;

        if (this.ws) {
            if (this.sessionId) {
                this.ws?.send(
                    await this.getWebsocketString({
                        op: Constants.OPCODES.RESUME,
                        d: {
                            token: this.Token,
                            session_id: this.sessionId,
                            seq: this.s,
                        },
                    })
                );
            }

            for await (const msg of this.ws) {
                let compMsg;
                if (typeof msg == "object") compMsg = msg;
                else {
                    compMsg = JSON.parse(msg);
                }

                this.s = compMsg?.s;

                console.log(compMsg);

                if (compMsg?.op == Constants.OPCODES.HELLO) {
                    interval = compMsg?.d?.heartbeat_interval;

                    this.SendHeartBeat(interval);
                    this.VerifyClient();
                    Logger.TimeEnd("Websocket.Connect-Verify");
                }

                if (compMsg?.op == Constants.OPCODES.Data) {
                    this.socketDataCallback.HandleEvent(compMsg);
                }
            }
        }
    }

    /**
     * Send heartbeat
     *
     * @param {number} interval
     * @returns
     * @memberof Websocket
     */
    async SendHeartBeat(interval: number) {
        try {
            if (!this.KeepAlive) return;
            Logger.Log("Websocket: Keep alive");

            if (this.ws) {
                this.ws.send(
                    JSON.stringify({
                        op: Constants.OPCODES.HEARTBEAT,
                        d: this.s,
                    })
                );
            } else {
                Logger.Log("Websocket: Sendheartbeat, ws not defined.");
            }

            setTimeout(() => {
                this.SendHeartBeat(interval);
            }, interval);
        } catch {
            Logger.Warn("Websocket: There most likely was a invalid token");
            this.Connect(this.Token);
        }
    }

    /**
     * Verify the client
     *
     * @param {string} Token
     * @memberof Websocket
     */
    async VerifyClient() {
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
                    },
                })
            );
        } else {
            return Error("VerifyClient: Fatal error, not connected to websocket.");
        }
    }

    /**
     * Stringify websocket data
     *
     * @template T
     * @param {T} object
     * @returns
     * @memberof Websocket
     */
    async getWebsocketString<T>(object: T) {
        return JSON.stringify(object);
    }
}
