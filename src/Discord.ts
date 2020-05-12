import Globals from "./Globals.ts";
import Websocket from "./Websocket/Websocket.ts";

export default class Discord {
    constructor(token: string) {
        // Initializing
        this.Globals = new Globals();

        this.Globals.Token = token;

        // Networking
        this.Websocket = new Websocket(this.Globals.Token);
    }

    public Globals: Globals;
    protected Websocket: Websocket;


    /**
     * Log into discord account
     *
     * @memberof Discord
     */
    public async login() {
        // Connect to the websocket
        await this.Websocket.Connect();
    }
}

export { };

