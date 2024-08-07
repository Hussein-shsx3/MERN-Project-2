import express from "express";
import Post from "../models/Posts.js";
import User from "../models/Users.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

//* Create a new post
router.post("/", auth, async (req, res, next) => {
  try {
    const post = new Post({
      description: req.body.description,
      user: req.body.userId,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

//* Get all Posts
router.post("/allPosts", auth, async (req, res, next) => {
  try {
    const findAllPosts = await Post.find()
      .populate({
        path: "user",
      })
      .populate({
        path: "comments",
      });
    if (!findAllPosts) {
      return res.status(404).send("Posts not found!");
    }
    res.status(200).json(findAllPosts);
  } catch (err) {
    next(err);
  }
});

//* Get all Posts for one user
router.post("/allPosts", auth, async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user.id);
    const findAllPosts = await Post.find({ user: findUser })
      .populate({
        path: "user",
      })
      .populate({
        path: "comments",
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
    res.json({ message: "Post deleted", post });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

export default router;
