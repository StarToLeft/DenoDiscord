export default class Constants {
    static API_URL = "https://discordapp.com/api/v6";
    static GATEWAY_URL = "wss://gateway.discord.gg:443/?v=6&encoding=json"
    static OPCODES = {
        HEARTBEAT: 1,
        IDENTIFY: 2,
        HELLO: 10,
    }

    static options: {
        Debug: true,
    }
}