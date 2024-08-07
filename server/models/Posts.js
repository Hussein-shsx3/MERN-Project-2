import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
