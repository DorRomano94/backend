import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  portfolio: [{ type: String }],
});


export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  portfolio: string[];
}