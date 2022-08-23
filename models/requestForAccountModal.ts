import mongoose from "mongoose";

const requestForAccountModal = new mongoose.Schema(
  {
    serialNumber: { type: Number, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    key: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("requestForAccount", requestForAccountModal);
