import * as bcrypt from "bcrypt";
import admins from "../db-schemas/admins";
import { myAssert } from "../helpers/Error_Handler";
const { GraphQLError } = require("graphql");
const saltRounds = 10;


const admin_signup = async (args: any, req: any) => {
    try {
        let obj1 = await admins.findOne({ email: args.email }).lean().exec();
        let obj2 = await admins.findOne({ username: args.username }).lean().exec();

        myAssert (obj1,"email already registered")
        myAssert (obj2,"username already registered")
        myAssert (args.password.length<5,"password must have atleast 5 charecters")
        
                await bcrypt.hash(args.password,saltRounds,function(err,hash){
                    args.password = hash
                    admins.create( args )
                })

        return { message: "account created" }; 
    } 
    catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default admin_signup