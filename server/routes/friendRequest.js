import express from "express";
import User from "../models/Users.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

// Send a friend request
router.post("/send-request/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(id);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.friends.includes(id)) {
      return res.status(400).json({ message: "Already friends" });
    }

    if (friend.friendRequests.includes(user._id)) {
      return res.status(400).json({ message: "Already sended request" });
    }

    // Assuming you have a friendRequests field in the User model to store pending requests
    friend.friendRequests.push(user.id);
    await friend.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (err) {
    next(err);
  }
});

router.post("/accept-request/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(id);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequests.includes(id)) {
      return res
        .status(400)
        .json({ message: "No friend request from this user" });
    }

    user.friends.push(id);
    friend.friends.push(user.id);

    user.friendRequests = user.friendRequests.filter(
      (requestId) => requestId.toString() !== id
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    next(err);
  }
});

router.post("/ignore-request/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(id);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.friendRequests.includes(id)) {
      return res
        .status(400)
        .json({ message: "No friend request from this user" });
    }

    user.friendRequests = user.friendRequests.filter(
      (requestId) => requestId.toString() !== id
    );

    await user.save();

    res.status(200).json({ message: "Friend request ignored" });
  } catch (err) {
    next(err);
  }
});

router.delete("/remove/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(id);

    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }

    user.friends = user.friends.filter(
      (friendId) => friendId.toString() !== id
    );

    friend.friends = friend.friends.filter(
      (friendId) => friendId.toString() !== user.id
    );

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed" });
  } catch (err) {
    next(err);
  }
});

export default router;
