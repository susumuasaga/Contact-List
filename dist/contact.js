"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function CreateContactModel() {
    const contactSchema = new mongoose.Schema({
        name: { type: String, trim: true, required: true, index: true },
        fields: { type: Map, of: String }
    });
    return mongoose.model('Contact', contactSchema);
}
exports.CreateContactModel = CreateContactModel;