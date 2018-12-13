export default class AppConfig {
    private static _instance: AppConfig;

    public static create(defaults: object, env: object): void {
        AppConfig._instance = new AppConfig(defaults, env);
    }

    public static instance(): AppConfig {
        if ( ! AppConfig._instance) {
            throw new Error('Cannot get app config instance. Create one first.');
        }
        return AppConfig._instance;
    }

    public static reset(): void {
        AppConfig._instance = null;
    }

    private readonly _env: object = {};
    private readonly _defaults: object = {};


    private constructor(defaults: object, env: object) {
        this._defaults = defaults;
        this._env = env;
    }


    public getValueForName<T>(name: string): T {
        if (name in this._env && this._env[name] !== '~') {
            return this._env[name];
        }
        if (name in this._defaults) {
            return this._defaults[name];
        }
        throw new Error(`Cannot get config option '${name}'. Option is not set nether in defaults nor environment.`);
    }


    public get(name: string): string {
        const value = this.getValueForName<string>(name);
        return this.substitute(value);
    }


    private substitute(value: string): string {
        const regex = /%([A-Z_0-9]+)%/g;
        const result = regex.exec(value);
        if ( ! result) {
            return value;
        }
        const includedVariableName = result[1];
        const substituteValue = this.getValueForName<string>(includedVariableName);
        return value.replace(`%${includedVariableName}%`, substituteValue);
    }

    private substituteAll(obj: object): object {
        const substitutedObject = {...obj};
        for (let propertyName in substitutedObject) {
            if ( ! substitutedObject.hasOwnProperty(propertyName)) {
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


    public asObject(name: string): object {
        const value = this.getValueForName<any>(name);
        if (typeof value === 'object') {
            return this.substituteAll(value);
        }
        throw new Error(`Cannot get config option '${name}' as object. Value is typeof ${typeof value}`);
    }


    public asNumber(name: string): number {
        const value = this.getValueForName<string>(name);
        return parseInt(this.substitute(value));
    }
}