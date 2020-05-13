export default class Snowflake {

    protected _snowflake: string = "";

    constructor(id: string = "") {
        this._snowflake = id;
    }

    public get snowflake() : string {
        return this._snowflake;
    }

    public set snowflake(id : string) {
        this._snowflake = id;
    }

    public getCreationDate() {
        
    }

}