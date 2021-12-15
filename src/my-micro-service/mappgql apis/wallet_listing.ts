import wallets from "../db-schemas/wallets";
const jwt = require("jsonwebtoken");


const wallet_listing = async (args:any,req:any) => {

    let tok = await req.headers["x-access-token"];
    let decoded:any = await jwt.verify(tok, "secret")  
        let obj:any = await wallets.find({ created_by: decoded._id }).lean().exec();
        
        if(obj === null){
            return { message : "authentication failed ! pls login " }
        }else{
            return {  data:obj };
        }

}

export default wallet_listing;