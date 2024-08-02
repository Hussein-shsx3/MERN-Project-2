import express from "express";
import User from "../models/Users.js";
import FriendRequest from "../models/request.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

// Send a friend request
router.post("/send/:receiverId", auth, async (req, res, next) => {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;

  try {
    //* Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    //* Check if a request is already pending or if they are already friends
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Friend request already sent or exists" });
    }

    const isAlreadyFriends =
      (await User.findOne({ _id: senderId, friends: receiverId })) ||
      (await User.findOne({ _id: receiverId, friends: senderId }));

    if (isAlreadyFriends) {
      return res.status(400).json({ message: "You are already friends" });
    }

    //* Create a new friend request
    const newRequest = new FriendRequest({
      sender: senderId,
      receiver: receiverId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Friend request sent" });
  } catch (err) {
    next(err);
  }
});

//* Accept a friend request
router.post("/accept/:requestId", auth, async (req, res, next) => {
  const userId = req.user.id;
  const requestId = req.params.requestId;

  try {
    // Find the friend request
    const request = await FriendRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (
      request.receiver.toString() !== userId ||
      request.status !== "pending"
    ) {
      return res.status(400).json({ message: "Request cannot be accepted" });
    }

    // Update the friend request status
    request.status = "accepted";
    await request.save();

    // Add each other to friends list
    const sender = await User.findById(request.sender);
    const receiver = await User.findById(request.receiver);

    if (sender && receiver) {
      sender.friends.push(receiver._id);
      receiver.friends.push(sender._id);

      await sender.save();
      await receiver.save();
    }

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    next(err);
  }
});

export default router;
