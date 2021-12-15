import * as bcrypt from "bcrypt";
import admins from "../db-schemas/admins";
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const admin_login = async (args: any, req: any) => {
        
    try {
        let obj:any = await admins.findOne({ email: args.email }).lean().exec();
        
         if (obj === null) {
            return { message: "email does not exists" };
        } else {
            let verifPass = await bcrypt.compare(args.password,obj.password)
            
            if (verifPass === true) {
                var token = jwt.sign ( obj, "secret", { expiresIn: 3600 });
                return { message: "logged in", token: token };
            } else {
                return { message: "incorrect password" };
            }
        }
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default admin_login