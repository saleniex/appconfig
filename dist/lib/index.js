"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AppConfig_1 = require("./AppConfig");
const OptionLoader_1 = require("./OptionLoader");
const Environment_1 = require("./Environment");
function createAppConfig(config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const loader = new OptionLoader_1.default();
        loader.addReadersFromConfig(config);
        yield loader.load();
        AppConfig_1.default.create(loader.loadedOptions(), Environment_1.default.getOptions());
    });
}
exports.createAppConfig = createAppConfig;
function appConfigInstance() {
    return AppConfig_1.default.instance();
}
exports.appConfigInstance = appConfigInstance;
function appCfg(name) {
    return AppConfig_1.default.instance().get(name);
}
function appCfgObject(name) {
    return AppConfig_1.default.instance().asObject(name);
}
exports.appCfgObject = appCfgObject;
exports.default = appCfg;
//# sourceMappingURL=index.js.map