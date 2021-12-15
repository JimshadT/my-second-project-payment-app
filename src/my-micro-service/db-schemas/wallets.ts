import * as mongoose from 'mongoose';

export interface Iwallets {
    walletName : string
    amount : string
    created_by:string
    message : string

};


let Schema = mongoose.Schema;
let mySchema = new Schema({
    walletName : { type: String, required: true },
    amount : { type: String, required: true },
    created_by : { type: String, required: true },
    message : { type: String},
});


export interface IwalletsModel extends mongoose.Document { }

export default mongoose.model<IwalletsModel>('wallets', mySchema);