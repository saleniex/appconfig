"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppConfig_1 = require("./AppConfig");
const fs = require("fs");
function createAppConfig(options) {
    require('dotenv').config();
    const defaults = loadDefaults(options.defaultsPath);
    AppConfig_1.default.create(defaults, process.env);
}
exports.createAppConfig = createAppConfig;
function appConfig() {
    return AppConfig_1.default.instance();
}
function loadDefaults(path) {
    if (!fs.existsSync(this._options.defaultsPath)) {
        throw new Error(`Cannot load app config defaults from '${this._options.defaultsPath}'. Path does not exists.`);
    }
    const defaultsFileContent = fs.readFileSync(path);
    return JSON.parse(defaultsFileContent.toString());
}
exports.default = appConfig;
//# sourceMappingURL=index.js.map