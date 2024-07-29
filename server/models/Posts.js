import mongoose, { Schema } from "mongoose";

const PostsSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    description: { type: String, required: true },
    image: String,
    likes: String,
    comments: { type: Schema.Types.ObjectId, ref: "Comments" },
  },
  { timestamps: true }
);

const Posts = new mongoose.model("Posts", PostsSchema);

export default Posts;
