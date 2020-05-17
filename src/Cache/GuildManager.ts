import { Constants } from "../Constants.ts";
import { Discord } from "../Discord.ts";
import Globals from "../Globals.ts";
import Guild from "../Structures/Guild.ts";
import User from "../Structures/User.ts";
import { Logger } from "../Utils/Logger.ts";

interface IGuildManager {
    [id: string]: Guild;
}

export class GuildManager {
    constructor(client: Discord.Client) {
        this.client = client;
    }

    public cache: IGuildManager = {};

    public client: Discord.Client;

    /**
     * Fetch and save to cache if not disabled
     *
     * @private
     * @param {string} id
     * @param {boolean} [saveToCache=true]
     * @returns {Promise<Guild>}
     * @memberof GuildManager
     */
    private fetch(id: string, saveToCache: boolean = true): Promise<Guild> {
        return new Promise((resolve, reject) => {
            fetch(`${Constants.API_URL}/guilds/${id}?with_counts=true`, {
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
                        Logger.Error("GuildChannelCache: Failed to fetch message, rejecting.");
                        return reject(data);
                    }

                    // This is stupid, it basically destroys the typings' and recreates them for the owner variable,
                    // which kind of destroys the point with having resolve error out with a null return --> This solution is stupid, please fix.
                    let owner = <User>(<unknown>await this.client.users.resolve(data?.owner_id));
                    let guild: Guild = new Guild(
                        this.client,
                        data?.id,
                        data?.name,
                        data?.region,
                        data?.afk_timeout,
                        data?.verification_level,
                        0,
                        owner
                    ); // TODO: Fix member count and add Roles
                    guild.description = data?.description;
                    guild.partial = false;
                    guild.maxMembers = data?.max_members;
                    guild.memberCount = data?.approximate_member_count;

                    if (saveToCache) this.save(guild);

                    resolve(guild);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    public save(guild: Guild) {
        this.cache[guild.id] = guild;
    }

    /**
     * Resolve a guild from the cache
     *
     * @param {string} id
     * @returns {(Promise<Guild | null>)}
     * @memberof GuildManager
     */
    public async resolve(id: string): Promise<Guild | null> {
        try {
            let guild = this.cache[id] || null;
            if (guild && !guild.partial) return guild;

            guild = await this.fetch(id);
            return guild;
        } catch (error) {
            Logger.Error(error);
            return null;
        }
    }
}
