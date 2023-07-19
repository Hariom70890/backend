const express = require("express");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(200).json({ msg: "user already present" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (hash) {
          const user = await UserModel({ ...req.body, password: hash });
          await user.save();
          res.status(200).json({ msg: "user created successfully" });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.secrate);
          res.status(200).json({ msg: "Login Successfull", token });
        } else {
          res.status(404).json({ msg: "Wrong Cridentials" });
        }
      });
    } else {
      res.status(404).json({ error: "User not Found...!!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
