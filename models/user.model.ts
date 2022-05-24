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
    fullName: { type: String, minLength: 5, required: true },
    email: {
      type: String,
      minLength: 5,
      unique: true,
      required: true,
      validate: {
        validator: function (v: any) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    docVersion: { type: Number, default: 0 },
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<UserType>("users", UserSchema);
