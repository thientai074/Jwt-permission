import { Document, Schema, Types, model } from "mongoose";

interface UserType extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  docVersion: number;
  isDisabled: boolean;
}

const UserSchema = new Schema<UserType>(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    docVersion: { type: Number, default: 0 },
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<UserType>("users", UserSchema);
