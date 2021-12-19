import wallets from "../db-schemas/wallets";
import { myAssert } from "../helpers/Error_Handler";
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");


const wallet_listing = async (args:any,req:any,user:any) => {
    try{
        let tok = await req.headers["x-access-token"];
        let decoded:any = await jwt.verify(tok, "secret101")  
        let obj:any = await wallets.find({ created_by: decoded._id }).lean().exec();
        
        myAssert(obj===null,"authentication failed ! pls login ")
        
            return {  data:obj };

    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default wallet_listing;