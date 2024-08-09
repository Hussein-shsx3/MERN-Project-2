import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  description: String,
  postImage: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
