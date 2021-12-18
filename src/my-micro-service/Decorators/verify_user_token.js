"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Error_Handler_1 = require("../helpers/Error_Handler");
const jwt = require("jsonwebtoken");
function extract_token_from_request(req) {
    var token = (req.locals && req.locals.token) || req.query.token || req.body.token || req.headers["x-access-token"];
    return token;
}
async function verifyUser(args) {
    Error_Handler_1.myAssert(args.length > 2, "Invalid request");
    let req = args;
    let token = await extract_token_from_request(req);
    let decoded = await jwt.verify(token, "secret101");
    Error_Handler_1.myAssert(!decoded, "authentication failed");
    return decoded;
}
exports.verifyUser = verifyUser;
