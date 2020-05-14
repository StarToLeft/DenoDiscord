import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Discord, MessageCreatedEvent, PresenceUpdateEvent, ReadyEvent } from "../mod.ts";

const app = new Discord.Client();

app.set("debug", true);

app.on("READY", (e: ReadyEvent) => {
    console.log(`Ready`);

    console.log(app.clientUser?.user);
})

app.on("MESSAGE_CREATE", (e: MessageCreatedEvent) => {
    console.log("Recieved message")
})

app.once("PRESENCE_UPDATE", (e: PresenceUpdateEvent) => {
    console.log("Presence update");
})

app.login(config().Token);