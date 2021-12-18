"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admins_1 = require("../db-schemas/admins");
const wallets_1 = require("../db-schemas/wallets");
const verify_user_token_1 = require("../Decorators/verify_user_token");
const Error_Handler_1 = require("../helpers/Error_Handler");
const { GraphQLError } = require("graphql");
const admin_wallet = async (args, req) => {
    try {
        let decoded = verify_user_token_1.verifyUser(req);
        console.log("here");
        let obj = await admins_1.default.findOne({ _id: decoded._id }).lean().exec();
        console.log("here2");
        Error_Handler_1.myAssert(obj === null, "user authentication failed");
        wallets_1.default.updateOne(args, { $set: Object.assign(Object.assign({}, args), { created_by: obj._id }) }, { upsert: true }).exec();
        return { message: "admin wallet created", };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_wallet;
