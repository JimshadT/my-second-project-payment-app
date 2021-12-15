import * as mongoose from 'mongoose';

export interface Iadmins {
    username : string
    email : string
    password : string
    message : string
    data?: any
};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    username : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    message : { type: String},
    data : { type: mongoose.SchemaTypes.Mixed },
});


export interface IadminsModel extends mongoose.Document { }

export default mongoose.model<IadminsModel>('admins', mySchema);