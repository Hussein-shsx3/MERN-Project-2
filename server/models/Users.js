import mongoose, { Schema } from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 2, max: 50 },
    lastName: { type: String, required: true, min: 2, max: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    picturePath: { type: String, default: "" },
    password: { type: String, required: true, min: 6 },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    location: String,
    occupation: String,
    viewedProfile: String,
    impressions: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UsersSchema);

export default User;
