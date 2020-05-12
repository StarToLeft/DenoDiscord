export default abstract class Resolver {

    abstract URL: string;

    abstract async getData<T>(callback: T): Promise<unknown>;

}