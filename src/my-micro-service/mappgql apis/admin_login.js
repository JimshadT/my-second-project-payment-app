"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const admins_1 = require("../db-schemas/admins");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const admin_login = async (args, req) => {
    try {
        let obj = await admins_1.default.findOne({ email: args.email }).lean().exec();
        if (obj === null) {
            return { message: "email does not exists" };
        }
        else {
            let verifPass = await bcrypt.compare(args.password, obj.password);
            if (verifPass === true) {
                var token = jwt.sign(obj, "secret", { expiresIn: 3600 });
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
exports.default = admin_login;
