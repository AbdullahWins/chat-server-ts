import { Schema, model } from "mongoose";
import { IUser } from "../../interfaces";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
});

export const User = model("User", userSchema);
