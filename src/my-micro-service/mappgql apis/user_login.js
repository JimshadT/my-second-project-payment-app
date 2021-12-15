"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const users_1 = require("../db-schemas/users");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const user_login = async (args, req) => {
    try {
        let obj = await users_1.default.findOne({ email: args.email }).lean().exec();
        if (obj === null) {
            return { message: "email does not exists" };
        }
        else {
            let verifPass = await bcrypt.compare(args.password, obj.password);
            if (verifPass === true) {
                var token = jwt.sign(obj, "secret", { expiresIn: 6000 });
                return { message: "logged in", token: token };
            }
            else {
                return { message: "incorrect password" };
            }
        }
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = user_login;
