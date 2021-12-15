
function extract_token_from_request(req: any) {
    var token = (req.locals && req.locals.token) || req.query.token || req.body.token || req.headers["x-access-token"];
    return token;
}
export { extract_token_from_request };