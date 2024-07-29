import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

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
      isVerified: false,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_KAY, {
      expiresIn: "1d",
    });

    //* send the email verify
    const url = `http://localhost:3000/verify/${token}`;
    transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: newUser.email,
      subject: "Verify your email",
      html: `<a href="${url}">Click here to verify your email</a>`,
    });

    await newUser.save();

    res.status(201).json({ userDetails: newUser, token });
  } catch (err) {
    next(err);
  }
});

export default router;
