export enum ClientOptionsTypes {
    "DEBUG",
}

export type ClientOptions = ClientOptionsTypes[keyof ClientOptionsTypes] | "DEBUG";
