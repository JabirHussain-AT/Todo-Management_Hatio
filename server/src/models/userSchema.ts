import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IUser } from "../interface/IUser";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("Users", userSchema);

export interface IUserData extends IUser {
  createdAt: Date;
  updatedAt: Date;
}