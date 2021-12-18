"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallets_1 = require("../db-schemas/wallets");
const Error_Handler_1 = require("../helpers/Error_Handler");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const wallet_listing = async (args, req) => {
    try {
        let tok = await req.headers["x-access-token"];
        let decoded = await jwt.verify(tok, "secret101");
        let obj = await wallets_1.default.find({ created_by: decoded._id }).lean().exec();
        Error_Handler_1.myAssert(obj === null, "authentication failed ! pls login ");
        return { data: obj };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = wallet_listing;
