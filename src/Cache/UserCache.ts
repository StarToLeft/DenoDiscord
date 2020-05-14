import { Constants } from "../Constants.ts";
import { Discord } from "../Discord.ts";
import Globals from "../Globals.ts";
import User from "../Structs/User.ts";
import { Logger } from "../Utils/Logger.ts";

interface IUserCache {
    [id: string]: User;
}

export default class UserCache {
    constructor(client: Discord.Client) {
        this.client = client;
    }

    public cache: IUserCache = {};

    public client: Discord.Client;

    /**
     * Fetch a user from the discord api
     *
     * @param {string} id
     * @returns {Promise<User>}
     * @memberof UserCache
     */
    fetch(id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.API_URL}/users/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bot " + Globals.getInstance().Token!,
                    "User-Agent": Constants.USER_AGENT,
                    "Content-Type": "application/json",
                },
            })
                .then(async (res) => {
                    const data = await res.json();

                    if (data?.message) {
                        Logger.Error("UserCache: Failed to fetch user, rejecting.");
                        return reject(data);
                    }
                    
                    let user: User = new User(data.id, data.username, data.discriminator);
                    user.bot = data?.bot;
                    user.avatar = data?.avatar;
                    
                    resolve(data);
                })
                .catch((error) => {
                    Logger.Error("UserCache: Failed to fetch user, rejecting.");
                    reject(error);
                });
        });
    }

    /**
     * Save user to cache
     *
     * @param {User} user
     * @memberof UserCache
     */
    save(user: User) {
        this.cache[user.id] = user;
    }

    /**
     * Resolve user from cache
     *
     * @param {string} id
     * @returns {(Promise<User | null>)}
     * @memberof UserCache
     */
    async resolve(id: string): Promise<User | null> {
        try {
            let user = this.cache[id] || null;
            if (user && !user.partial) return user;

            user = await this.fetch(id);
            return user;
        } catch {
            return null;
        }
    }
}
