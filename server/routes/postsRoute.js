import express from "express";
import Post from "../models/Posts.js";
import User from "../models/Users.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();
router.post("/", auth, async (req, res, next) => {
  const { description, picturePath } = req.body;

  const userId = req.user.id;

  try {
    const findUser = await User.findById(userId);
    const newPost = new Post({
      userId: userId,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      location: findUser.location,
      description,
      picturePath,
      userPicturePath: findUser.picturePath,
      likes: {},
      comments: [],
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
});

//* get all posts
router.get("/all", auth, async (req, res, next) => {
  try {
    const findPosts = await Post.find();
    res.status(200).json(findPosts);
  } catch (err) {
    next(err);
  }
});

//*  get user posts
router.get("/", auth, async (req, res, next) => {
  try {
    const findPosts = await Post.find({ userId: req.user.id });
    res.status(200).json(findPosts);
  } catch (err) {
    next(err);
  }
});

//* likes
router.get("/:postId", auth, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const findPost = await Post.findById(postId);
    const isLiked = findPost.likes.get(userId);

    if (isLiked) {
      findPost.likes.delete(userId);
    } else {
      findPost.likes.set(userId, true);
    }

    await findPost.save(); // Save the updated post
    res.status(200).json(findPost);
  } catch (err) {
    next(err);
  }
});

export default router;
