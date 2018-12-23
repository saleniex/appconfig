export default class Environment {
    public static getOptions(): object {
        require('dotenv').config();
        return process.env;
    }
}