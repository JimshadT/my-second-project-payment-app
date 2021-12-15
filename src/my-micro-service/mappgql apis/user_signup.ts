import * as bcrypt from "bcrypt";
import users from "../db-schemas/users";
const { GraphQLError } = require("graphql");
const saltRounds = 10;



const user_signup = async (args: any, req: any) => {
    try {
        let obj:any = await users.findOne({ email: args.email }).lean().exec();
        let obj2:any = await users.findOne({ username: args.username }).lean().exec();

        if (obj !== null) {
            return { message: "email already registered" };
        } else if (obj2 !== null) {
            return { message: "username already exists" };
        } else {
            if (args.password.length < 5) {
                return { message: "password must have atleast 5 charecter" };
            } else {
                await bcrypt.hash(args.password,saltRounds,function(err,hash){
                    args.password = hash                        
                    users.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
                })
                return { message: "user account created" };
            }
        }
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default user_signup;