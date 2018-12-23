import OptionReader from './OptionReader';
import OptionReaderFactory, {OptionReaderConfig} from './OptionReaderFactory';


export default class OptionLoader {
    private _readers: OptionReader[] = [];
    private _options: object;


    public addReadersFromConfig(config: OptionReaderConfig[]): void {
        const readers = new OptionReaderFactory().createBatch(config);
        this.addReaders(readers);
    }


    public addReaders(readers: OptionReader[]): void {
        readers.forEach((reader: OptionReader) => {
            this.addReader(reader);
        });
    }


    public addReader(reader: OptionReader): void {
        this._readers.push(reader);
    }


    public async load(): Promise<void> {
        const promises: Promise<object>[] = [];
        this._readers.forEach((reader: OptionReader) => {
            const promise = reader.read();
            promises.push(promise);
        });
        const objects = await Promise.all(promises);
        this.setOptions(objects);
    }


    public loadedOptions(): object {
        if ( ! this._options) {
            throw new Error('Cannot get loaded options prior loading is done. Call load() first.');
        }
        return this._options;
    }


    get readers(): OptionReader[] {
        return this._readers;
    }


    private setOptions(objects: object[]): void {
        let mergedObjects= {};
        objects.forEach((o: object) => {
            mergedObjects = Object.assign(mergedObjects, o);
        });
        this._options = mergedObjects;
    }
}