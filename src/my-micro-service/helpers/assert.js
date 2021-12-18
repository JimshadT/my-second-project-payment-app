"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLError } = require("graphql");
exports.myAssert = (condition, message) => {
    if (condition) {
        throw new GraphQLError(message, null, null, null);
    }
};
