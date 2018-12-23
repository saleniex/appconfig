"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonOptionReader_1 = require("./JsonOptionReader");
const DumbOptionReader_1 = require("./DumbOptionReader");
var OptionReaderType;
(function (OptionReaderType) {
    OptionReaderType["JSON"] = "json";
    OptionReaderType["DUMB"] = "dumb";
})(OptionReaderType || (OptionReaderType = {}));
exports.OptionReaderType = OptionReaderType;
class OptionReaderFactory {
    createBatch(config) {
        const readers = [];
        config.forEach((readerCfg) => {
            const optionReader = this.create(readerCfg.type, readerCfg.source);
            readers.push(optionReader);
        });
        return readers;
    }
    create(type, source) {
        switch (type) {
            case OptionReaderType.JSON:
                return new JsonOptionReader_1.default(source);
            case OptionReaderType.DUMB:
                return new DumbOptionReader_1.default(JSON.parse(source));
            default:
                throw new Error(`Cannot create OptionReader. Unknown type '${type}'.`);
        }
    }
}
exports.default = OptionReaderFactory;
//# sourceMappingURL=OptionReaderFactory.js.map