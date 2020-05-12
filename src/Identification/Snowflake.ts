export default class Snowflake {

    protected snowflake: string = "";

    public get get() : string {
        return this.snowflake;
    }

    public set set(id : string) {
        this.snowflake = id;
    }

}