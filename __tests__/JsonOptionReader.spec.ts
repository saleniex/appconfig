import JsonOptionReader from '../lib/JsonOptionReader';

describe('JsonOptionReader', () => {
    it('Reads JSON file', () => {
        const reader = new JsonOptionReader('__tests__/__mock__/options.json');
        expect.assertions(4);
        reader.read()
            .then((obj: object) => {
                expect('opt0' in obj).toBeTruthy();
                expect(obj['opt0']).toBe('_O0_');
                expect('opt1' in obj).toBeTruthy();
                expect(obj['opt1']).toBe('_O1_');
            });
    });


    it('Throws exception on non-existing file', () => {
        const reader = new JsonOptionReader('non_existent.json');
        expect.assertions(1);
        reader.read()
            .catch((e) => {
                expect(e.message).toBe('Cannot read JSON options from \'non_existent.json\'. Path does not exists.');
            });
    });


    it('Throws exception on invalid file format', () => {
        const reader = new JsonOptionReader('__tests__/__mock__/options.txt');
        expect.assertions(1);
        reader.read()
            .catch((e) => {
                expect(e.message).toBe('Cannot read options from JSON file. Invalid file format.');
            });
    });
});