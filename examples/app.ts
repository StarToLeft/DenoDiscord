import { Discord, ReadyEvent } from "../mod.ts";
import Globals from "../src/Globals.ts";

const app = new Discord.Client();

Globals.getInstance().Debug = true;

app.on("READY", (e: ReadyEvent) => {
    console.log(`${e.data.Client.username}#${e.data.Client.discriminator}`);
})

//app.login("NDE5MjUxMDYyOTY5NDY2ODgw.XrxtiA.6KWCPIeWc7bsYHCs5Y6CTmQ4uL8"); //
app.login("NzEwMTcxOTk0ODIxMzYxNzE2.XrwlQw.9Ck_SDfepR7S09p1ZpyM9l9mpIY");