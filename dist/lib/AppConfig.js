"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor(defaults, env) {
        this._env = {};
        this._defaults = {};
        this._defaults = defaults;
        this._env = env;
    }
    static create(defaults, env) {
        AppConfig._instance = new AppConfig(defaults, env);
    }
    static instance() {
        if (!AppConfig._instance) {
            throw new Error('Cannot get app config instance. Create one first.');
        }
        return AppConfig._instance;
    }
    static reset() {
        AppConfig._instance = null;
    }
    getValueForName(name) {
        if (name in this._env && this._env[name] !== '~') {
            return this._env[name];
        }
        if (name in this._defaults) {
            return this._defaults[name];
        }
        throw new Error(`Cannot get config option '${name}'. Option is not set nether in defaults nor environment.`);
    }
    get(name) {
        const value = this.getValueForName(name);
        return this.substitute(value);
    }
    substitute(value) {
        const regex = /%([A-Z_0-9]+)%/g;
        const result = regex.exec(value);
        if (!result) {
            return value;
        }
        const includedVariableName = result[1];
        const substituteValue = this.getValueForName(includedVariableName);
        return value.replace(`%${includedVariableName}%`, substituteValue);
    }
    substituteAll(obj) {
        const substitutedObject = Object.assign({}, obj);
        for (let propertyName in substitutedObject) {
            if (!substitutedObject.hasOwnProperty(propertyName)) {
                continue;
            }
            if (typeof substitutedObject[propertyName] === 'object') {
                substitutedObject[propertyName] = this.substituteAll(substitutedObject[propertyName]);
                continue;
            }
            if (typeof substitutedObject[propertyName] === 'string') {
                substitutedObject[propertyName] = this.substitute(substitutedObject[propertyName]);
            }
        }
        return substitutedObject;
    }
    asObject(name) {
        const value = this.getValueForName(name);
        if (typeof value === 'object') {
            return this.substituteAll(value);
        }
        throw new Error(`Cannot get config option '${name}' as object. Value is typeof ${typeof value}`);
    }
    asNumber(name) {
        const value = this.getValueForName(name);
        return parseInt(this.substitute(value));
    }
}
exports.default = AppConfig;
//# sourceMappingURL=AppConfig.js.map