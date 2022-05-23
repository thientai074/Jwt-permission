import { Document, Schema, Types, model } from "mongoose";
import { UserType } from "../types/types";

interface CustomerType extends Document {
  user: UserType;
  phone: string;
}

const CustomerSchema = new Schema<CustomerType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    phone: { type: String },
  },
  { timestamps: true }
);

export const Customer = model<CustomerType>("customers", CustomerSchema);
