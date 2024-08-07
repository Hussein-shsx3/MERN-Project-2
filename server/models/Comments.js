import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;
