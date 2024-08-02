import express from "express";
import User from "../models/Users.js";

const router = express.Router();

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).send("Invalid link or user does not exist!");
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send("Email verified successfully!");
  } catch (err) {
    next(err);
  }
});

export default router;
