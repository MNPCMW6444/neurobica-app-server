import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true, unique: true },
    deactivated: { type: Boolean, required: true },
    deleted: { type: Boolean, required: true },
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
