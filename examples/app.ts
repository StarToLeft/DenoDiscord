import { Discord, ReadyEvent } from "../mod.ts";
import Globals from "../src/Globals.ts";

const app = new Discord.Client();

Globals.getInstance().Debug = true;

app.on("READY", (e: ReadyEvent) => {
    console.log(`${e.data.Client.username}#${e.data.Client.discriminator}`);
})

app.login("");