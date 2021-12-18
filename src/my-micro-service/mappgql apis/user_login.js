"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const users_1 = require("../db-schemas/users");
const Error_Handler_1 = require("../helpers/Error_Handler");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const user_login = async (args, req) => {
    try {
        let obj = await users_1.default.findOne({ email: args.email }).lean().exec();
        Error_Handler_1.myAssert(obj === null, "email does not exists");
        let verifPass = await bcrypt.compare(args.password, obj.password);
        Error_Handler_1.myAssert(verifPass !== true, "incorrect password");
        var token = jwt.sign(obj, "secret101", { expiresIn: 6000 });
        return { message: "logged in", token: token };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
};
exports.default = user_login;
