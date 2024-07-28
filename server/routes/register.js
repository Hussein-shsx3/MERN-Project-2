import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";

const router = express.Router();

//* Register Users
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    //* find User
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send("User already exists!");
    }
    //* hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    //* create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
    });
    await newUser.save();
    res.status(201).json({ userDetails: newUser });
  } catch (err) {
    next(err);
  }
});

export default router;
