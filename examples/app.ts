import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Discord, MessageCreatedEvent, ReadyEvent } from "../mod.ts";

const client = new Discord.Client();

const PREFIX = "!";

client.on("READY", async (e: ReadyEvent) => {
    console.log(`Ready as ${e.user.tag}`);
});

client.on("MESSAGE_CREATE", (e: MessageCreatedEvent) => {
    if (!e.message.content.startsWith(PREFIX)) return;
    
    const message = e.message;
    const command = message.content.replace(PREFIX, "").toLowerCase();

    if (command.includes("ping")) {
        message.channel.send(`My current ping to discord is ${client.ping}ms`)
    }
})

client.login(config().Token);
