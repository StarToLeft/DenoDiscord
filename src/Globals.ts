export default class Globals {
    private static instance: Globals;

    public static getInstance(): Globals {
        if (!Globals.instance) {
            Globals.instance = new Globals();
        }

        return Globals.instance;
    }

    public Token: string = "";

    public Debug: boolean = false;

    public LogWebsocket: boolean = false;
}
