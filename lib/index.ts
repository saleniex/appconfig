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

export {createAppConfig};
export default appConfig;
