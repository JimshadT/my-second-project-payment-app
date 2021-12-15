"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallets_1 = require("../db-schemas/wallets");
const jwt = require("jsonwebtoken");
const wallet_listing = async (args, req) => {
    let tok = await req.headers["x-access-token"];
    let decoded = await jwt.verify(tok, "secret");
    let obj = await wallets_1.default.find({ created_by: decoded._id }).lean().exec();
    if (obj === null) {
        return { message: "authentication failed ! pls login " };
    }
    else {
        return { data: obj };
    }
};
exports.default = wallet_listing;
