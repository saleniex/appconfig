"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const OptionReaderFactory_1 = require("./OptionReaderFactory");
class OptionLoader {
    constructor() {
        this._readers = [];
    }
    addReadersFromConfig(config) {
        const readers = new OptionReaderFactory_1.default().createBatch(config);
        this.addReaders(readers);
    }
    addReaders(readers) {
        readers.forEach((reader) => {
            this.addReader(reader);
        });
    }
    addReader(reader) {
        this._readers.push(reader);
    }
    load() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const promises = [];
            this._readers.forEach((reader) => {
                const promise = reader.read();
                promises.push(promise);
            });
            const objects = yield Promise.all(promises);
            this.setOptions(objects);
        });
    }
    loadedOptions() {
        if (!this._options) {
            throw new Error('Cannot get loaded options prior loading is done. Call load() first.');
        }
        return this._options;
    }
    get readers() {
        return this._readers;
    }
    setOptions(objects) {
        let mergedObjects = {};
        objects.forEach((o) => {
            mergedObjects = Object.assign(mergedObjects, o);
        });
        this._options = mergedObjects;
    }
}
exports.default = OptionLoader;
//# sourceMappingURL=OptionLoader.js.map