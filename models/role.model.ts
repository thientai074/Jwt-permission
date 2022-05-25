import { Document, Schema, Types, model } from "mongoose";
import mongoose from "mongoose";

interface UserType extends Document {
  roleId: string;
  roleType: string;
  rights: Array<string>;
}

const RoleSchema = new Schema({
  roleId: {
    type: String,
    required: [true, "Role Id required"],
  },
  roleType: {
    type: String,
    required: [true, "Role type is required"],
  },
  rights: [{ type: String }],
});

export const Role = model<UserType>("roles", RoleSchema);
