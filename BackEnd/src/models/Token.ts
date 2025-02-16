import mongoose, { Schema, Document, Types } from "mongoose";

export interface IToken extends Document {
  token: string;
  user: Types.ObjectId;
  creadAt: Date;
}

const TokenSchema: Schema = new Schema({
  token: {
    type: String,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  }

});


const token = mongoose.model<IToken>("Token", TokenSchema);

export default token;