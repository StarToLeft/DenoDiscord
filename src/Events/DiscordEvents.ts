import { DiscordDispatchEvents } from "../Events/DispatchEvents.ts";

export abstract class DiscordEvent {
    abstract data: DiscordEventData;
}

export abstract class DiscordEventData {
    public abstract type: DiscordDispatchEvents;
}