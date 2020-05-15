import Guild from "../Guild.ts";

export interface IGuildChannel {
    id: string;
    type: number;
    guild: Guild;
    position: number;
    permissionOverwrites: any[]; // TODO: Fix real permission overwrites object type
    name?: string;
}
