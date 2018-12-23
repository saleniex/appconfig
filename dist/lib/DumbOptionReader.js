"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const OptionReader_1 = require("./OptionReader");
class DumbOptionReader extends OptionReader_1.default {
    constructor(content) {
        super('');
        this._content = content;
    }
    read() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._content;
        });
    }
}
exports.default = DumbOptionReader;
//# sourceMappingURL=DumbOptionReader.js.map