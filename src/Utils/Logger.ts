import Constants from "../Constants";

export default class Logger {
    static Log<T>(log: T) {
        if (Constants.options.Debug) {
            const date = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0];
            
            console.log(`[${date}] ${log}`);
        }
    }
}