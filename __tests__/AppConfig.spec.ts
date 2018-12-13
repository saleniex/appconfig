import AppConfig from '../lib/AppConfig';

describe('AppConfig', () => {
    it('Creates instance', () => {
        AppConfig.reset();
        AppConfig.create({}, {});
        const instance = AppConfig.instance();
        expect(instance).toBeInstanceOf(AppConfig);
    });

    it('Throws error if instance is not created', () => {
        AppConfig.reset();
        expect(() => {
            AppConfig.instance();
        }).toThrowError('Cannot get app config instance. Create one first.');
    });

    it('Gets simple option', () => {
        AppConfig.reset();
        AppConfig.create({
            SIMPLE_OPTION: "_SIMPLE_OPTION_",
        }, {});
        const cfg = AppConfig.instance();
        expect(cfg.get('SIMPLE_OPTION')).toBe('_SIMPLE_OPTION_');
    });

    it('Gets simple option as number', () => {
        AppConfig.reset();
        AppConfig.create({
            NUMBER_OPTION: "12345",
        }, {});
        const cfg = AppConfig.instance();
        expect(cfg.asNumber('NUMBER_OPTION')).toBe(12345);
    });

    it('Returns NaN if not a number', () => {
        AppConfig.reset();
        AppConfig.create({
            NUMBER_OPTION: "not a number",
        }, {});
        const cfg = AppConfig.instance();
        expect(cfg.asNumber('NUMBER_OPTION')).toBe(NaN);
    });

    it('Gets substituted option', () => {
        AppConfig.reset();
        AppConfig.create({
            SIMPLE_WITH_SUBSTITUTE: "_SIMPLE_OPTION_WITH_SUBSTITUTE_ %SUBSTITUTE_OPTION%",
            SUBSTITUTE_OPTION: "_SUBSTITUTE_OPTION_",
        }, {});
        const cfg = AppConfig.instance();
        expect(cfg.get('SIMPLE_WITH_SUBSTITUTE')).toBe('_SIMPLE_OPTION_WITH_SUBSTITUTE_ _SUBSTITUTE_OPTION_');
    });

    it('Gets complex option', () => {
        AppConfig.reset();
        AppConfig.create({
            SIMPLE_OPTION: '_SIMPLE_OPTION_',
            COMPLEX_OPTION: {
                o1: {
                    o11: '_O11_',
                    o12: '_O12_',
                    o13: '%SIMPLE_OPTION%',
                },
            },
        }, {});
        const cfg = AppConfig.instance();
        const option = cfg.asObject('COMPLEX_OPTION');
        expect(JSON.stringify(option)).toBe('{"o1":{"o11":"_O11_","o12":"_O12_","o13":"_SIMPLE_OPTION_"}}');
    });

    it('Overrides with environment', () => {
        AppConfig.reset();
        AppConfig.create({
            SIMPLE_OPTION: "_SIMPLE_OPTION_",
        }, {
            SIMPLE_OPTION: "_OVERRIDDEN_SIMPLE_OPTION_",
        });
        const cfg = AppConfig.instance();
        expect(cfg.get('SIMPLE_OPTION')).toBe('_OVERRIDDEN_SIMPLE_OPTION_');
    });

    it('Inherits from environment', () => {
        AppConfig.reset();
        AppConfig.create({
            SIMPLE_OPTION: "_SIMPLE_OPTION_",
        }, {
            SIMPLE_OPTION: "~",
        });
        const cfg = AppConfig.instance();
        expect(cfg.get('SIMPLE_OPTION')).toBe('_SIMPLE_OPTION_');
    });

    it('Overrides from environment and substitutes', () => {
        AppConfig.reset();
        AppConfig.create({
            OPTION_WITH_SUBSTITUTE: '_OPTION_WITH_SUBSTITUTE_: %SIMPLE_OPTION%',
            SIMPLE_OPTION: "_SIMPLE_OPTION_",
        }, {
            SIMPLE_OPTION: "_OVERRIDDEN_SIMPLE_OPTION_",
        });
        const cfg = AppConfig.instance();
        expect(cfg.get('OPTION_WITH_SUBSTITUTE')).toBe('_OPTION_WITH_SUBSTITUTE_: _OVERRIDDEN_SIMPLE_OPTION_');
    });
});