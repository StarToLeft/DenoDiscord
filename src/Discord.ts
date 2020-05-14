import UserCache from "./Cache/UserCache.ts";
import { DiscordDispatchEvents } from "./Events/DispatchEvents.ts";
import EventEmitter from "./Events/EventEmitter.ts";
import Globals from "./Globals.ts";
import ClientUser from "./Structs/ClientUser.ts";
import Websocket from "./Websocket/Websocket.ts";

export namespace Discord {
    export class Client {
        constructor() {
            // Register a new EventHandler
            this.EventHandler = new EventEmitter(this);

            // Initialize a websocket
            this.Websocket = new Websocket(this.EventHandler);

            this.UserCache = new UserCache(this);
        }

        protected Websocket: Websocket;
        public EventHandler: EventEmitter;

        public UserCache: UserCache;

        public clientUser: ClientUser | undefined;

        /**
         * Register event listener
         *
         * @param {string} event
         * @param {CallableFunction} callback
         * @memberof Discord
         */
        on(event: DiscordDispatchEvents, eventCallback: CallableFunction) {
            this.EventHandler.RegisterListener(event, eventCallback);
        }

        /**
         * Register an event listener once
         *
         * @param {string} event
         * @param {CallableFunction} callback
         * @memberof Discord
         */
        once(event: DiscordDispatchEvents, eventCallback: CallableFunction) {
            this.EventHandler.RegisterListener(event, eventCallback, true);
        }

        set(name: string, value: boolean) {
            if (name.toLowerCase().replace(" ", "") == "debug") {
                Globals.getInstance().Debug = value;
            }
        }

        /**
         * Log into discord account
         *
         * @memberof Discord
         */
        public async login(token: string) {
            // Set the bot token
            Globals.getInstance().Token = token;

            // Connect to the websocket
            await this.Websocket.Connect(Globals.getInstance().Token);
        }
    }
}
