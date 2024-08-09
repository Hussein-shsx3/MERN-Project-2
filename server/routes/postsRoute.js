import express from "express";
import Post from "../models/Posts.js";
import User from "../models/Users.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

//* Create a new post
router.post("/", auth, async (req, res, next) => {
  try {
    const post = new Post({
      user: req.user.id,
      description: req.body.description,
      postImage: req.body.postImage ? req.body.postImage : "",
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

//* Get all Posts for one user
router.get("/", auth, async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user.id);
    const findAllPosts = await Post.find({ user: findUser })
      .populate({
        path: "user",
        select: "firstName lastName _id picturePath location",
      })
      .populate({
        path: "comments.user",
        select: "firstName lastName _id picturePath location",
      });
    if (!findAllPosts) {
      return res.status(404).send("Posts not found!");
    }
    res.status(200).json(findAllPosts);
  } catch (err) {
    next(err);
  }
});

//* Get all Posts
router.get("/allPosts", auth, async (req, res, next) => {
  try {
    const findAllPosts = await Post.find()
      .populate({
        path: "user",
        select: "firstName lastName _id picturePath location",
      })
      .populate({
        path: "comments.user",
        select: "firstName lastName _id picturePath location",
      });
    if (!findAllPosts) {
      return res.status(404).send("Posts not found!");
    }
    res.status(200).json(findAllPosts);
  } catch (err) {
    next(err);
  }
});

//* Delete a post
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post was deleted"});
  } catch (err) {
    next(err);
  }
});

//* create a new comment
router.post("/addComment/:postId", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({
        path: "user",
      })
      .populate({
        path: "comments.user",
        select: "firstName lastName _id picturePath location",
      });
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();
    res.status(200).json({ message: "Comment was added" });
  } catch (err) {
    next(err);
  }
});

//* delete the comment
router.delete(
  "/deleteComment/:postId/comment/:commentId",
  auth,
  async (req, res, next) => {
    try {
      const commentId = req.params.commentId;
      const post = await Post.findById(req.params.postId);
      const comment = post.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Remove the comment from the comments array
      post.comments.pull(commentId);
      await post.save();
      res.status(200).json({ message: "Comment was deleted" });
    } catch (err) {
      next(err);
    }
  }
);

//* Toogle like on post
router.post("/:postId/like", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
});

export default router;
