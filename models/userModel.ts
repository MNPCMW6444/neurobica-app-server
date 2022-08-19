import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      required: true,
      unique: true,
    },
    active: { type: Boolean, required: true },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
