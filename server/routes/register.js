import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
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
    const {
      firstName,
      lastName,
      email,
      friends,
      password,
      location,
      occupation,
      picturePath,
    } = req.body;
    //* find User
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).send("User already exists!");
    }

    //* hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    //* create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      location,
      friends,
      viewedProfile: Math.floor(Math.random() * 10000),
      occupation,
      impressions: Math.floor(Math.random() * 10000),
      picturePath,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
      isVerified: false,
    });

    await newUser.save();

        //* send the email verify
        const url = `https://mern-socialmedia-project-1.onrender.com/isVerified/${newUser._id}`;
        transporter.sendMail({
          from: process.env.ADMIN_EMAIL,
          to: newUser.email,
          subject: "Verify your email",
          html: `<a href="${url}">Click here to verify your email</a>`,
        });

    res.status(201).json({ userDetails: newUser });
  } catch (err) {
    next(err);
  }
});

export default router;
