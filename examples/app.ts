import { Discord } from "../mod.ts";
import Globals from "../src/Globals.ts";

const app = new Discord.Client();

Globals.getInstance().Debug = true;

app.on("READY", () => {
    console.log(`Ready`);
})

app.on("MESSAGE_CREATE", () => {
    console.log("Recieved message")
})

app.once("PRESENCE_UPDATE", (data: any) => {
    console.log(data);
    console.log("Presence update");
})

app.login("");