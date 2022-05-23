import { Document, Schema, Types, model } from "mongoose";
import { UserType } from "../types/types"

interface CustomerType extends Document {
  fullname: string;
  user: UserType;
  email: string;
  phone: string;
}

const CustomerSchema = new Schema<CustomerType>(
  {
    fullname: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export const Customer = model<CustomerType>("Customer", CustomerSchema);
