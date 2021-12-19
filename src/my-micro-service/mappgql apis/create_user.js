"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../db-schemas/users");
const Error_Handler_1 = require("../helpers/Error_Handler");
const graphql_1 = require("graphql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const create_user = async (args, req) => {
    try {
        let obj1 = await users_1.default.findOne({ email: args.email }).lean().exec();
        let obj2 = await users_1.default.findOne({ username: args.username }).lean().exec();
        Error_Handler_1.myAssert(obj1, "email already registered");
        Error_Handler_1.myAssert(obj2, "username already exists");
        Error_Handler_1.myAssert(args.password.length < 5, "password must have atleast 5 charecter");
        await bcrypt.hash(args.password, saltRounds, function (err, hash) {
            args.password = hash;
            users_1.default.create(args);
        });
        return { message: "new user created" };
    }
    catch (err) {
        throw new graphql_1.GraphQLError(err.message, null, null, null);
    }
};
exports.default = create_user;
