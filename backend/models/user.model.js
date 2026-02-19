import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
 

    password: {
      type: String,
      required: true,
      select: false, // do not return password field by default
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, //  very important
  }
);

export const User = mongoose.model("User", userSchema);
