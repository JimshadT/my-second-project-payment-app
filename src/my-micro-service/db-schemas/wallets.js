"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
;
let Schema = mongoose.Schema;
let mySchema = new Schema({
    walletName: { type: String, required: true },
    amount: { type: String, required: true },
    created_by: { type: String, required: true },
    message: { type: String },
});
exports.default = mongoose.model('wallets', mySchema);
