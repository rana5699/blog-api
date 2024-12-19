import { model, Schema } from "mongoose";
import { TUser } from "./user.interfaces";
import bcrypt from "bcrypt";
import config from "../../config/config";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// hashed password
userSchema.pre("save", async function () {
  this.password = bcrypt.hashSync(this.password, Number(config.salt_round));
});

// empty password after save as response
userSchema.post("save", async function () {
  this.password = "";
});

// Export User model
export const User = model<TUser>("User", userSchema);
