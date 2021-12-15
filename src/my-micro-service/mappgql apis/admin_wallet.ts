import admins from "../db-schemas/admins";
import wallets from "../db-schemas/wallets";
const jwt = require("jsonwebtoken");


const admin_wallet = async (args:any,req:any) => {
        
    let tok = await req.headers["x-access-token"];
    let decoded:any = await jwt.verify(tok, "secret")  
        let obj = await admins.findOne({ _id: decoded._id }).lean().exec();

        if(obj === null){
            return { message : "authentication failed " }
        }else{
            wallets.updateOne(args, { $set: { ...args,created_by: obj._id } }, { upsert: true }).exec();
            return { message: "admin wallet created",  };
        }
}

export default admin_wallet;