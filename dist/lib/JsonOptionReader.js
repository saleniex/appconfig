"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const OptionReader_1 = require("./OptionReader");
const fs = require("fs");
class JsonOptionReader extends OptionReader_1.default {
    constructor(path) {
        super(path);
    }
    read() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(this.source)) {
                throw new Error(`Cannot read JSON options from '${this.source}'. Path does not exists.`);
            }
            const content = fs.readFileSync(this.source);
            try {
                return JSON.parse(content.toString());
            }
            catch (e) {
                throw new Error('Cannot read options from JSON file. Invalid file format.');
            }
        });
    }
}
exports.default = JsonOptionReader;
//# sourceMappingURL=JsonOptionReader.js.map