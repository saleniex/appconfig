import AppConfig from './AppConfig';
import AppConfigOptions from './AppConfigOptions';
import * as fs from "fs";

function createAppConfig(options: AppConfigOptions) {
    require('dotenv').config();
    const defaults = loadDefaults(options.defaultsPath);
    AppConfig.create(defaults, process.env);
}

function appConfig(): AppConfig {
    return AppConfig.instance();
}

function loadDefaults(path: string): object {
    if (!fs.existsSync(this._options.defaultsPath)) {
        throw new Error(`Cannot load app config defaults from '${this._options.defaultsPath}'. Path does not exists.`);
    }
    const defaultsFileContent = fs.readFileSync(path);

    return JSON.parse(defaultsFileContent.toString());
}

export {createAppConfig, AppConfigOptions};
export default appConfig;
