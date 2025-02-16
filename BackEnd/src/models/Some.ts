import mongoose, { Schema, Document } from "mongoose";

export interface ISome extends Document {
    name: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Some = mongoose.model<ISome>("Some", userSchema);

export default Some;