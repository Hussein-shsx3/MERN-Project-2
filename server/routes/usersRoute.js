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
    const findUser = await User.findById(req.user.id).populate("friends");
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      location: req.body.location,
      profession: req.body.profession,
      picturePath: req.body.picturePath,
    });
    if (updateUser) {
      res.status(200).send(updateUser); //? if the user updated is already in the list?
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
router.get("/addFriend", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("friends");
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.status(200).json(user.friends);
  } catch (err) {
    next(err);
  }
});
router.get("/friends", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("friends");
    if (!user) {
      return res.status(404).send("User not found!");
    }
    res.status(200).json(user.friends);
  } catch (err) {
    next(err);
  }
});

router.delete("/friends/:friendId", auth, async (req, res, next) => {
  const Id = req.user.id;
  const friendId = req.params;
  try {
    const user = await User.findById(Id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).send("User not found!");
    }

    user.friends = user.friends.filter((id) => id !== friendId);
    friend.friends = friend.friends.filter((id) => id !== Id);

    await user.save();
    await friend.save();

    res.status(200).send("Friend removed successfully!");
  } catch (err) {
    next(err);
  }
});

export default router;
