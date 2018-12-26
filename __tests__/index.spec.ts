import appCfg, {createAppConfig, appConfigInstance} from '../lib';
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
                expect(appConfigInstance().get('opt01'))
                    .toBe('_O01_env_');
                expect(appConfigInstance().get('opt02'))
                    .toBe('_O02_');
                expect(appCfg('opt01'))
                    .toBe('_O01_env_');
                expect(appCfg('opt02'))
                    .toBe('_O02_');
            });
    });
});