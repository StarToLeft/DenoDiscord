import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Discord, ReadyEvent } from "../mod.ts";

const client = new Discord.Client();

client.set("DEBUG", true);

client.on("READY", async (e: ReadyEvent) => {
    console.log(`Ready as ${e.user.tag}`);

    let user = await client.users.resolve("223707551013797888");

    console.log(user?.tag);
});

client.login(config().Token);
