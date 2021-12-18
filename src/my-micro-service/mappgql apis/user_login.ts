import * as bcrypt from "bcrypt";
import users from "../db-schemas/users";
import { myAssert } from "../helpers/Error_Handler";
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");


const user_login = async (args: any, req: any) => {
    try {
        let obj:any = await users.findOne({ email: args.email }).lean().exec()
        myAssert(obj===null,"email does not exists")
        
        let verifPass = await bcrypt.compare(args.password,obj.password)
        myAssert(verifPass!==true,"incorrect password")
            
            var token = jwt.sign ( obj, "secret101", { expiresIn: 6000 });
            return { message: "logged in", token: token };
            
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default user_login;