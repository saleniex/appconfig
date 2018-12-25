import AppConfig from './AppConfig';
import {OptionReaderConfig} from './OptionReaderFactory';
import OptionLoader from './OptionLoader';
import Environment from './Environment';

async function createAppConfig(config: OptionReaderConfig[]): Promise<void> {
    const loader = new OptionLoader();
    loader.addReadersFromConfig(config);
    await loader.load();
    AppConfig.create(loader.loadedOptions(), Environment.getOptions());
}

function appConfig(): AppConfig {
    return AppConfig.instance();
}

function appCfg(name: string): string {
    return AppConfig.instance().get(name);
}

export {createAppConfig, appCfg};
export default appConfig;
