import admins from "../db-schemas/admins";
import wallets from "../db-schemas/wallets";
import { verifyUser } from "../Decorators/verify_user_token";
import { myAssert } from "../helpers/Error_Handler";
const { GraphQLError } = require("graphql");



const admin_wallet = async (args:any,req:any) => {
    try{    
        let decoded:any = verifyUser(req) 
        console.log("here");
        
        let obj = await admins.findOne({ _id: decoded._id }).lean().exec();
console.log("here2");

        myAssert(obj===null,"user authentication failed")

            wallets.updateOne(args, { $set: { ...args,created_by: obj._id } }, { upsert: true }).exec();
            return { message: "admin wallet created",  };
    }
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }    
}

export default admin_wallet;