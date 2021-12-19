"use strict";
// import { Provider } from "nconf";
Object.defineProperty(exports, "__esModule", { value: true });
// let nconf = new Provider({});
// var currentEnv = process.env.NODE_ENV || "development";
// try {
//     nconf.file({ file: require.resolve(`./${currentEnv}.json`) });
// } catch (e) {
//     //ignore file errors  
// }
// export default nconf;
const nconf_1 = require("nconf");
let nconf = new nconf_1.Provider({});
var currentEnv = process.env.NODE_ENV || "development";
nconf
    .argv()
    .env()
    .file({ file: require.resolve("./" + currentEnv + ".json") });
const env_map = {
    SMTP_USER: "smtp:user",
    SMTP_PASSWD: "smtp:password",
};
for (let key in env_map) {
    env_map[key] && nconf.set(env_map[key], nconf.get(key));
}
exports.default = nconf;
