export enum ClientOptionsTypes {
    "DEBUG", 
    "LOG_WEBSOCKET",
}

export type ClientOptions = ClientOptionsTypes[keyof ClientOptionsTypes] | "DEBUG" | "LOG_WEBSOCKET";
