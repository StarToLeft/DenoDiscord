export class Constants {
    static API_URL = "https://discordapp.com/api/v6";
    static GATEWAY_URL = "wss://gateway.discord.gg:443/?v=6&encoding=json"
    static USER_AGENT = "DenoDiscord (https://github.com/StarToLeft/DenoDiscord, 0.0.8)";
    static OPCODES = {
        Data: 0,
        HEARTBEAT: 1,
        IDENTIFY: 2,
        HELLO: 10,
        RESUME: 6
    }
}