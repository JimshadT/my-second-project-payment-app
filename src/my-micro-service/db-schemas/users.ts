import * as mongoose from 'mongoose';

export interface Iusers {
    username : string
    email : string
    password : string
    mobile : string
    ceated_by : string
    total_creditline: string
    available_creditline:string
    message : string
    data?: any
};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    username : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    mobile : { type: String, required: true },
    total_creditline : { type: String },
    available_creditline : { type: String },
    message : { type: String},
    data : { type: mongoose.SchemaTypes.Mixed },
});


export interface IusersModel extends mongoose.Document { }

export default mongoose.model<IusersModel>('users', mySchema);