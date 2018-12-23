import OptionLoader from '../lib/OptionLoader';
import DumbOptionReader from './__mock__/DumbOptionReader';
import JsonOptionReader from '../lib/JsonOptionReader';
import {OptionReaderType} from '../lib/OptionReaderFactory';

describe('OptionsLoader', () => {
    it('Add single reader', () => {
        const loader = new OptionLoader();
        loader.addReader(new DumbOptionReader({}));
        loader.addReader(new DumbOptionReader({}));
        expect(loader.readers.length).toBe(2);
    });

    it('Add multiple readers', () => {
        const loader = new OptionLoader();
        loader.addReaders([
            new DumbOptionReader({}),
            new JsonOptionReader('options.json'),
        ]);
        expect(loader.readers.length).toBe(2);
    });

    it('Add single reader from config', () => {
        const loader = new OptionLoader();
        loader.addReadersFromConfig([{
            type: OptionReaderType.JSON,
            source: 'options.json',
        }]);
        expect(loader.readers.length).toBe(1);
    });

    it('Loads from readers', () => {
        const r0 = new DumbOptionReader({
            optR00: '_R00_',
            optR01: '_R01_',
            optX: '_X0_',
        });
        const r1 = new DumbOptionReader({
            optR10: '_R10_',
            optR11: '_R11_',
            optX: '_X1_',
        });
        const loader = new OptionLoader();
        loader.addReaders([r0, r1]);
        expect.assertions(6);
        loader.load()
            .then(() => {
                const options = loader.loadedOptions();
                expect(Object.keys(options).length).toBe(5);
                expect(options['optR00']).toBe('_R00_');
                expect(options['optR01']).toBe('_R01_');
                expect(options['optR10']).toBe('_R10_');
                expect(options['optR11']).toBe('_R11_');
                expect(options['optX']).toBe('_X1_');

            })
    });

    it('Throws if try get loaded options prior loading', () => {
        expect(() => {
            new OptionLoader().loadedOptions();
        }).toThrowError('Cannot get loaded options prior loading is done. Call load() first.');
    });
});