"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_signup_1 = require("./mappgql apis/admin_signup");
const admin_login_1 = require("./mappgql apis/admin_login");
const user_signup_1 = require("./mappgql apis/user_signup");
const user_login_1 = require("./mappgql apis/user_login");
const admin_wallet_1 = require("./mappgql apis/admin_wallet");
const wallet_listing_1 = require("./mappgql apis/wallet_listing");
class MAPPGQL {
    constructor(params) {
        this.params = params;
    }
    async health() {
        return { status: "ok" };
    }
    async user_signup(args, req) {
        return await user_signup_1.default(args, req);
    }
    async user_login(args, req) {
        return await user_login_1.default(args, req);
    }
    async admin_signup(args, req) {
        return await admin_signup_1.default(args, req);
    }
    async admin_login(args, req) {
        return await admin_login_1.default(args, req);
    }
    //@verifyUser(Config.get("account_type:user"))
    async admin_wallet(args, req, user) {
        return await admin_wallet_1.default(args, req, user);
    }
    //@verifyUser(Config.get("account_type:user"))
    async wallet_listing(args, req, user) {
        return await wallet_listing_1.default(args, req, user);
    }
}
exports.default = MAPPGQL;
