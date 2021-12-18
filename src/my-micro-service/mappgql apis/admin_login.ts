import * as bcrypt from "bcrypt";
import admins from "../db-schemas/admins";
import { myAssert } from "../helpers/Error_Handler";
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");


const admin_login = async (args: any, req: any) => {
    try {
        let obj:any = await admins.findOne({ email: args.email }).lean().exec();
        myAssert (obj===null,"email does not exists")
        
        let verifPass = await bcrypt.compare(args.password,obj.password);
        myAssert (verifPass!==true,"incorrect password")

            var token = jwt.sign ( obj, "secret101", { expiresIn: 3600 });
            return { message: "logged in", token: token };
        
    } catch (err) {
        throw new GraphQLError(err.message, null, null, null);
    }
}

export default admin_login