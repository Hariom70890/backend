const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const { blackList } = require("../blackList");
const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const user = await UserModel.findOne({ email, name });
      if (user) {
         res.status(200).json({ msg: "User already exist, please login" });
      } else {
         bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
               res.status(400).json({ error: err.message });
            } else {
               const user = new UserModel({
                  name,
                  email,
                  password: hash,
               });
               await user.save();
               res.status(200).json({ msg: "New User Has Added" });
            }
         });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

userRouter.post("/login", async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await UserModel.findOne({ email });
      if (user) {
         //   console.log(user.password)
         bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
               var token = jwt.sign(
                  { userID: user.id, user: user.name },
                  process.env.secretKey,
                  { expiresIn: "7d" }
               );
               res.status(200).json({
                  msg: "Logged in Successful",
                  token: token,
               });
            } else {
               console.log(err);
               alert("Invalid User");
               res.status(200).json({ msg: "Wrong Credentials", err: err });
            }
         });
      }
   } catch (error) {
      alert("Wrong Credential");
      res.status(400).json({ error: error.message });
   }
});

userRouter.get("/logout", (req, res) => {
   const token = req.headers.authorization?.split(" ")[1];
   try {
      blackList.push(token);
      res.status(200).json({ msg: "Logged out Successful" });
   } catch (error) {
      res.status(400).json({ err: error.message });
   }
});

module.exports = { userRouter };
