import appConfig, {appCfg, createAppConfig} from '../lib';
import Environment from '../lib/Environment';
import {OptionReaderType} from '../lib/OptionReaderFactory';

describe('index', () => {
    it('Create options', () => {
        Environment.getOptions = () => {
            return {
                opt01: '_O01_env_',
            };
        };
        const config = [{
            type: OptionReaderType.DUMB,
            source: '{"opt01":"_O01_","opt02":"_O02_"}',
        }];
        createAppConfig(config)
            .then(() => {
                expect(appConfig().get('opt01'))
                    .toBe('_O01_env_');
                expect(appConfig().get('opt02'))
                    .toBe('_O02_');
                expect(appCfg('opt01'))
                    .toBe('_O01_env_');
                expect(appCfg('opt02'))
                    .toBe('_O02_');
            });
    });
});