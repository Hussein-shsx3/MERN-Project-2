import express from "express";
import User from "../models/Users.js";
import { auth } from "../middleware/tokenMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

//* Get all users
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    //* Find users
    const findUsers = await User.find();
    if (!findUsers) {
      return res.status(400).send("Users not found!");
    } else {
      return res.status(200).json(findUsers);
    }
  } catch (err) {
    next(err);
  }
});

//*  Get only one user
router.get("/", auth, async (req, res, next) => {
  try {
    //* Find user
    const findUser = await User.findById(req.user.id);
    if (!findUser) {
      return res.status(400).send("Users not found!");
    } else {
      return res.status(200).json(findUser);
    }
  } catch (err) {
    next(err);
  }
});

//* Update user
router.put("/", auth, async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    //* Find user and update
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      password: hashedPassword,
      image: req.body.image,
    });
    if (updateUser) {
      res.status(200).send("User updated successfully!"); //? if the user updated is already in the list?
    } else {
      res.status(400).send("User not found!");
    }
  } catch (err) {
    next(err);
  }
});

//* Delete user
router.delete("/", auth, async (req, res, next) => {
  try {
    //* Find user and delete
    const findUser = await User.findByIdAndDelete(req.user.id);
    if (!findUser) {
      return res.status(400).send("User not found!");
    } else {
      return res.status(200).send(`Deleted successfully`);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
