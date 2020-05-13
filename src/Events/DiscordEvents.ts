import { DiscordDispatchEvents } from "../Events/DispatchEvents.ts";
import User from "../Structs/User.ts";

export abstract class DiscordEvent {
    abstract data: DiscordEventData;
}

export abstract class DiscordEventData {
    public abstract type: DiscordDispatchEvents;
}

export class ReadyEventData implements DiscordEventData {
    constructor(type: DiscordDispatchEvents, client: User) {
        this.type = type;

        this.Client = client;
    }
    
    public type: DiscordDispatchEvents;

    public Client: User;
}

export class ReadyEvent implements DiscordEvent {
    constructor(data: any) {
        this.data = new ReadyEventData("READY", new User("1", "1", "1"));
    }

    data: ReadyEventData;
}
