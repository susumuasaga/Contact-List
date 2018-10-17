import mongoose = require('mongoose');

export interface ContactDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  fields: Map<string, string>;
}

export type ContactModel = mongoose.Model<ContactDoc>;

export function CreateContactModel(): ContactModel {
  const contactSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true, index: true },
    fields: { type: Map, of: String }
  });
  return mongoose.model<ContactDoc>('Contact', contactSchema);
}
