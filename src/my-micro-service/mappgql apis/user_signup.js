"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const users_1 = require("../db-schemas/users");
const { GraphQLError } = require("graphql");
const saltRounds = 10;
const user_signup = async (args, req) => {
    try {
        let obj = await users_1.default.findOne({ email: args.email }).lean().exec();
        let obj2 = await users_1.default.findOne({ username: args.username }).lean().exec();
        if (obj !== null) {
            return { message: "email already registered" };
        }
        else if (obj2 !== null) {
            return { message: "username already exists" };
        }
        else {
            if (args.password.length < 5) {
                return { message: "password must have atleast 5 charecter" };
            }
            else {
                await bcrypt.hash(args.password, saltRounds, function (err, hash) {
                    args.password = hash;
                    users_1.default.updateOne(args, { $set: Object.assign({}, args) }, { upsert: true }).exec();
                });
                return { message: "user account created" };
            }
        }
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = user_signup;
