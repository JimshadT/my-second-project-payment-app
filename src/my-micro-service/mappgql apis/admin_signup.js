"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const admins_1 = require("../db-schemas/admins");
const { GraphQLError } = require("graphql");
const saltRounds = 10;
const admin_signup = async (args, req) => {
    try {
        let obj = await admins_1.default.findOne({ email: args.email }).lean().exec();
        if (obj !== null) {
            return { message: "email already registered" };
        }
        else {
            if (args.password.length < 5) {
                return { message: "password must have atleast 5 charecters" };
            }
            else {
                await bcrypt.hash(args.password, saltRounds, function (err, hash) {
                    args.password = hash;
                    admins_1.default.updateOne(args, { $set: Object.assign({}, args) }, { upsert: true }).exec();
                });
                return { message: "account created" };
            }
        }
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = admin_signup;
