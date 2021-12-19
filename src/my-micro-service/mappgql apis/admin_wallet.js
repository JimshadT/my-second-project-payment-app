"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admins_1 = require("../db-schemas/admins");
const wallets_1 = require("../db-schemas/wallets");
const { GraphQLError } = require("graphql");
const admin_wallet = async (args, req, user) => {
    try {
        // let decoded:any = verifyUser(req) 
        console.log("here");
        let obj = await admins_1.default.findOne({ _id: user._id }).lean().exec();
        console.log("here2");
        //myAssert(obj===null,"user authentication failed")
        wallets_1.default.updateOne(args, { $set: Object.assign(Object.assign({}, args), { created_by: obj._id }) }, { upsert: true }).exec();
        return { message: "admin wallet created", };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_wallet;
