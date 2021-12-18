import assert = require("assert");
const { GraphQLError } = require("graphql")

export const myAssert = (condition, message: string) => {
    if ( condition ){
        throw new GraphQLError (message,null,null,null);
    }
}