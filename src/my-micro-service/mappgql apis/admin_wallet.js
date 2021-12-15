"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admins_1 = require("../db-schemas/admins");
const wallets_1 = require("../db-schemas/wallets");
const jwt = require("jsonwebtoken");
const admin_wallet = async (args, req) => {
    let tok = await req.headers["x-access-token"];
    let decoded = await jwt.verify(tok, "secret");
    let obj = await admins_1.default.findOne({ _id: decoded._id }).lean().exec();
    if (obj === null) {
        return { message: "authentication failed " };
    }
    else {
        wallets_1.default.updateOne(args, { $set: Object.assign(Object.assign({}, args), { created_by: obj._id }) }, { upsert: true }).exec();
        return { message: "admin wallet created", };
    }
};
exports.default = admin_wallet;
