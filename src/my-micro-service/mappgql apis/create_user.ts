import users from "../db-schemas/users";
import { myAssert } from "../helpers/Error_Handler";
import { GraphQLError } from "graphql";
import * as bcrypt from "bcrypt"
const saltRounds=10;


const create_user = async (args:any, req:any) => {
    try{
        let obj1:any = await users.findOne({ email: args.email }).lean().exec();
        let obj2:any = await users.findOne({ username: args.username }).lean().exec();

        myAssert(obj1,"email already registered")
        myAssert(obj2,"username already exists")
        myAssert(args.password.length < 5,"password must have atleast 5 charecter")
        
            await bcrypt.hash(args.password,saltRounds,function(err,hash){
                args.password = hash
                                        
                users.create(args)
            })
            return { message: "new user created" };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }

}

export default create_user;