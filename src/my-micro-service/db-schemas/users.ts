import * as mongoose from 'mongoose';

export interface Iusers {
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


export interface IusersModel extends mongoose.Document { }

export default mongoose.model<IusersModel>('users', mySchema);