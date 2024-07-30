import mongoose, { Schema } from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    from: { type: String, required: true },
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId }, //?
        userId: { type: Schema.Types.ObjectId, ref: "Users" },
        from: { type: String, required: true },
        replyAt: String,
        comment: String,
        created_At: { type: Date, default: Date.now() },
        updated_At: { type: Date, default: Date.now() },
        likes: String,
      },
    ],
    likes: String,
  },
  { timestamps: true } //?
);

const Comments = new mongoose.model("Comments", commentsSchema);

export default Comments;
