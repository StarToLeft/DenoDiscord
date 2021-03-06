import APIChannel from "./API/APIChannel.ts";
import { GuildManager } from "./Cache/GuildManager.ts";
import UserManager from "./Cache/UserManager.ts";
import { ClientOptions } from "./ClientOptions.ts";
import { DiscordDispatchEvents } from "./Events/DispatchEvents.ts";
import EventEmitter from "./Events/EventEmitter.ts";
import Globals from "./Globals.ts";
import User from "./Structures/User.ts";
import { Logger } from "./Utils/Logger.ts";
import Websocket from "./Websocket/Websocket.ts";

export namespace Discord {
    export class Client {
        constructor() {
            // Register a new EventHandler
            this.eventHandler = new EventEmitter(this);

            // Initialize a websocket
            this.websocket = new Websocket(this.eventHandler);

            this.users = new UserManager(this);
            this.guilds = new GuildManager(this);

            this.APIChannel = new APIChannel(this);

            this.user = new User("", "", "");
        }

        protected websocket: Websocket;
        protected eventHandler: EventEmitter;

        public token: string = "";

        public guilds: GuildManager;
        public users: UserManager;

        public user: User;

        public APIChannel: APIChannel;

        
        public get ping() : number {
            return this.websocket.ping;
        }
        

        /**
         * Register event listener
         *
         * @param {string} event
         * @param {CallableFunction} callback
         * @memberof Discord
         */
        on(event: DiscordDispatchEvents, eventCallback: CallableFunction) {
            this.eventHandler.RegisterListener(event, eventCallback);
        }

        /**
         * Register an event listener once
         *
         * @param {string} event
         * @param {CallableFunction} callback
         * @memberof Discord
         */
        once(event: DiscordDispatchEvents, eventCallback: CallableFunction) {
            this.eventHandler.RegisterListener(event, eventCallback, true);
        }

        /**
         * Set a discord client-option
         *
         * @param {ClientOptions} option
         * @param {boolean} value
         * @memberof Client
         */
        set(option: ClientOptions, value: any): boolean {
            switch (option) {
                case "DEBUG": {
                    try {
                        Globals.getInstance().Debug = value;
                    } catch {
                        Logger.Error(
                            `Discord.Client.set -> ${option}: Passed value was not a boolean.`
                        );
                        return false;
                    }

                    break;
                }
                
                case "LOG_WEBSOCKET": {
                    try {
                        Globals.getInstance().LogWebsocket = value;
                    } catch {
                        Logger.Error(
                            `Discord.Client.set -> ${option}: Passed value was not a boolean.`
                        );
                        return false;
                    }

                    break;
                }
            }

            Logger.Log(`Discord.Client.set -> ${option}: Set option to ${value}`);

            return true;
        }

        /**
         * Log into discord account
         *
         * @memberof Discord
         */
        public async login(token: string) {
            // Set the bot token
            //! DEPRECATED
            Globals.getInstance().Token = token;

            this.token = token;

            // Connect to the websocket
            await this.websocket.Connect(Globals.getInstance().Token);
        }
    }
}
