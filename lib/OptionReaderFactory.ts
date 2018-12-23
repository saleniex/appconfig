import OptionReader from './OptionReader';
import JsonOptionReader from './JsonOptionReader';
import DumbOptionReader from './DumbOptionReader';


interface OptionReaderConfig {
    type: OptionReaderType,
    source: string,
}


enum OptionReaderType {
    JSON = 'json',
    DUMB = 'dumb',
}

export {OptionReaderConfig, OptionReaderType};

export default class OptionReaderFactory {
    public createBatch(config: OptionReaderConfig[]): OptionReader[] {
        const readers: OptionReader[] = [];
        config.forEach((readerCfg: OptionReaderConfig) => {
            const optionReader = this.create(readerCfg.type, readerCfg.source);
            readers.push(optionReader);
        });

        return readers;
    }


    public create(type: OptionReaderType, source: string): OptionReader {
        switch (type) {
            case OptionReaderType.JSON:
                return new JsonOptionReader(source);

            case OptionReaderType.DUMB:
                return new DumbOptionReader(JSON.parse(source));

            default:
                throw new Error(`Cannot create OptionReader. Unknown type '${type}'.`);
        }
    }
}