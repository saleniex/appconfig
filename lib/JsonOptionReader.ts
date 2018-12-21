import OptionReader from './OptionReader';
import * as fs from "fs";

export default class JsonOptionReader extends OptionReader {
    constructor(path: string) {
        super(path);
    }


    public async read(): Promise<object> {
        if ( ! fs.existsSync(this.source)) {
            throw new Error(`Cannot read JSON options from '${this.source}'. Path does not exists.`);
        }
        const content = fs.readFileSync(this.source);

        try {
            return JSON.parse(content.toString());
        } catch (e) {
            throw new Error('Cannot read options from JSON file. Invalid file format.');
        }
    }
}