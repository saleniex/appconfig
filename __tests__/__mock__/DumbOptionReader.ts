import OptionReader from '../../lib/OptionReader';

export default class DumbOptionReader extends OptionReader {
    private _content: object;

    public constructor(content: object) {
        super('');
        this._content = content;
    }

    async read(): Promise<object> {
        return this._content;
    }
}