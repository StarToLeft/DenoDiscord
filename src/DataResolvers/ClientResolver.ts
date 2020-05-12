import { GATEWAY_USERS_CLIENT_URL } from "src/GATEWAY_URLS";
import Resolver from "./Resolver.ts";

export default class ClientResolver implements Resolver {
    
    URL: string = GATEWAY_USERS_CLIENT_URL;

    getData<T>(callback: T): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

} 
