import * as bcrypt from "bcrypt";
import admins from "../db-schemas/admins";
const { GraphQLError } = require("graphql");
const saltRounds = 10;


const admin_signup = async (args: any, req: any) => {
    try {
        let obj = await admins.findOne({ email: args.email }).lean().exec();
        
        if (obj !== null) {
            return { message: "email already registered" };
        
        } else {
            if (args.password.length < 5) {
                return { message: "password must have atleast 5 charecters" };
            } else {
                await bcrypt.hash(args.password,saltRounds,function(err,hash){
                    args.password = hash
                    admins.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
                })
                return { message: "account created" };
            }
        }
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default admin_signup