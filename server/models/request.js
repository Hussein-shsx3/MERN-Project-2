import mongoose, { Schema } from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const friendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default friendRequest;