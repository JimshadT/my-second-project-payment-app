"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extract_token_from_request(req) {
    var token = (req.locals && req.locals.token) || req.query.token || req.body.token || req.headers["x-access-token"];
    return token;
}
exports.extract_token_from_request = extract_token_from_request;
