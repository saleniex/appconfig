NodeJS config repository
--

Dotenv wrapper

## Set up config

Configuration singleton is created in the main file. If **defaultsPath** property is provided defaults are red at 
the moment of config creation. Defaults must be a JSON file.

```javascript 1.8
import {createAppConfig} from 'appconfig';

createAppConfig({
    defaultsPath: "./defaults.json",
});
```

## Use config

Config can be accessed anywhere in application right after `createAppConfig()` call.

Options from `.env` file overrides defaults (if any are loaded). For example if option exists in both `.env` and 
defaults file, value from `.env` will be returned by `get()` call.

In cases when option itself must persist in `.env` for documentation purposes but contain default value, option's value 
can be set to "~" (tilde).

```javascript 1.8
import appConfig from 'appconfig';

const result = appConfig().get('MY_OPTION');
console.log(result);
```

## Advanced usage

Sometimes it is not enough to have option value only as string. For example you might need to load structured config into 
some factory object. In those cases you can create option with object structure in defaults file. And override only 
environment specific parts.

**defaults.json**
```javascript 1.8
{
    "COMPLEX_OPT": {
        "user": "johndoe",
        "pass": "%PASS%"
    }
}
```

**.env**
```bash
PASS=TheVerySecretPass
```

```javascript 1.8
import {createAppConfig} from 'appconfig';
import appConfig from 'appconfig';

createAppConfig({
    defaultsPath: "./defaults.json",
});

const result = appConfig().asObject('COMPLEX_OPT');
console.log(result['pass']); // outputs: TheVerySecretPass

```

