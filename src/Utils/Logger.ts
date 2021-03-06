import Globals from "../Globals.ts";

export class Logger {
    static Log<T>(log: T) {
        if (Globals.getInstance().Debug) {
            const date = new Date();

            let hours: string = date.getHours().toString();
            if (hours.length < 2) hours = "0" + hours;

            let minutes: string = date.getMinutes().toString();
            if (minutes.length < 2) minutes = "0" + minutes;

            let seconds: string = date.getSeconds().toString();
            if (seconds.length < 2) seconds = "0" + seconds;

            let formattedDate =
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;

            console.log(`[${formattedDate}] ${log}`);
        }
    }
    
    static Warn<T>(Log: T) {
        this.Log(Log);
    }

    static Error<T>(Log: T) {
        this.Log(Log);
    }

    static async Time(name: string) {
        if (Globals.getInstance().Debug) {
            console.time(name);
        }
    }

    static async TimeEnd(name: string) {
        if (Globals.getInstance().Debug) {
            console.timeEnd(name);
        }
    }
}
