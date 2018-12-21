import OptionReaderFactory, {OptionReaderType} from '../lib/OptionReaderFactory';
import JsonOptionReader from '../lib/JsonOptionReader';

let factory: OptionReaderFactory = null;

describe('OptionReaderFactory', () => {

    beforeAll(() => {
        factory = new OptionReaderFactory();
    });

    it('Creates single option reader', () => {
        const reader = factory.create(OptionReaderType.JSON, '_S0_');
        expect(reader).toBeInstanceOf(JsonOptionReader);
        expect(reader.source).toBe('_S0_');
    });

    it('Creates multiple option readers', () => {
        const readers = factory.createBatch([{
            source: '_S0_',
            type: <OptionReaderType.JSON>'json',
        }, {
            source: '_S1_',
            type: <OptionReaderType.JSON>'json',
        }]);

        expect(Array.isArray(readers)).toBeTruthy();
        expect(readers.length).toBe(2);
        expect(readers[0]).toBeInstanceOf(JsonOptionReader);
        expect(readers[1]).toBeInstanceOf(JsonOptionReader);
        expect(readers[0].source).toBe('_S0_');
        expect(readers[1].source).toBe('_S1_');
    });

    it('Throws exception in case of invalid type', () => {
        expect(() => {
            factory.create(<OptionReaderType.JSON>'_X_', '_S0_');
        }).toThrowError("Cannot create OptionReader. Unknown type '_X_'.");
    });
});