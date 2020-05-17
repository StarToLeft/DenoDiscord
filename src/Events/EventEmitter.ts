import { Discord } from "../Discord.ts";
import { IDiscordEvent } from "../Events/DiscordEvents.ts";
import { DiscordDispatchEvents, GatewayPayload } from "../Events/DispatchEvents.ts";
import { MessageCreatedEvent } from "./EventTypes/MessageCreatedEvent.ts";
import { PresenceUpdateEvent } from "./EventTypes/PresenceUpdateEvent.ts";
import { ReadyEvent } from "./EventTypes/ReadyEvent.ts";

export class EventListener {
    constructor(
        id: number,
        event: DiscordDispatchEvents,
        eventCallback: CallableFunction,
        once: boolean = false
    ) {
        this.id = id;
        this.event = event;
        this.callback = eventCallback;
        this.once = once;
    }

    id: number;
    once: boolean;

    event: DiscordDispatchEvents;
    callback: CallableFunction;
}

export default class EventEmitter {
    constructor(client: Discord.Client) {
        this.client = client;
    }

    private epoch: number = 0;
    private Listeneres: EventListener[] = [];
    private client: Discord.Client;

    /**
     * Register a new Listener
     *
     * @param {DiscordDispatchEvents} event
     * @param {CallableFunction} eventCallback
     * @param {boolean} [once=false]
     * @returns {Promise<EventListener>}
     * @memberof EventHandler
     */
    public async RegisterListener(
        event: DiscordDispatchEvents,
        eventCallback: CallableFunction,
        once: boolean = false
    ): Promise<EventListener> {
        const id = (this.epoch += 1);
        const eventListener = new EventListener(id, event, eventCallback, once);

        this.Listeneres.push(eventListener);

        return eventListener;
    }

    /**
     * Unregister a listener
     *
     * @param {number} id
     * @memberof EventHandler
     */
    public async UnregisterListener(id: number) {
        this.Listeneres = this.Listeneres.filter((x) => x.id != id);
    }

    /**
     * Handle a discord event
     *
     * @param {GatewayPayload} data
     * @returns {Promise<boolean>}
     * @memberof EventHandler
     */
    public async HandleEvent(data: GatewayPayload): Promise<boolean> {
        if (data?.t) {
            switch (data.t) {
                case "READY": {
                    let eventData = new ReadyEvent(this.client);
                    await eventData.assign(data?.d);

                    this.TriggerEvent(data.t, eventData);
                    break;
                }

                case "MESSAGE_CREATE": {
                    let eventData = new MessageCreatedEvent(this.client);
                    await eventData.assign(data?.d)
                    
                    // Check for itself
                    if (data?.d?.author?.id == this.client.user.id) {
                        return false;
                    }

                    this.TriggerEvent(data.t, eventData);
                    break;
                }

                case "PRESENCE_UPDATE": {
                    let eventData = new PresenceUpdateEvent(data?.d, this.client);

                    this.TriggerEvent(data.t, eventData);
                    break;
                }
            }

            return true;
        }

        return false;
    }

    /**
     * Emit a denodiscord event
     *
     * @param {DiscordDispatchEvents} event
     * @param {IDiscordEvent} eventData
     * @memberof EventHandler
     */
    public async TriggerEvent(event: DiscordDispatchEvents, eventData: IDiscordEvent) {
        this.Listeneres.filter((x) => x.event == event).forEach((eventListener) => {
            eventListener.callback(eventData);

            if (eventListener.once) {
                this.UnregisterListener(eventListener.id);
            }
        });
    }
}
