export default abstract class OptionReader {
    public readonly source: string;

    protected constructor(source: string) {
        this.source = source;
    }

    public abstract async read(): Promise<object>;
}