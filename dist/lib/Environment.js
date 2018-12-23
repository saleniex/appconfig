"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    static getOptions() {
        require('dotenv').config();
        return process.env;
    }
}
exports.default = Environment;
//# sourceMappingURL=Environment.js.map