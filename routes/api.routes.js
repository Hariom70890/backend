const express = require("express");
const bcrypt = require("bcrypt");
const {  BlogModel, UserModel1 } = require("../model/user1.model");
const jwt = require("jsonwebtoken");
const { blackList } = require("../blackList");
const {authentication} = require("../middleware/authentication.middleware")
const api = express.Router();
require("dotenv").config();

api.post("/register", async (req, res) => {
   const { avatar, name, email, password } = req.body;
   try {
      const user = await UserModel1.findOne({ email, name });
      if (user) {
         res.status(200).json({ msg: "User already exist, please login" });
      } else {
         bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
               res.status(400).json({ error: err.message });
            } else {
               const user = new UserModel1({
                  avatar,
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

api.post("/login", async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await UserModel1.findOne({ email });
      if (user) {
         //   console.log(user.password)
         bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
               var token = jwt.sign(
                  { userID: user.id, user: user.name },
                  process.env.secretKey1
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

api.get("/blogs",async(req,res)=>{
   try {
      const blog = await BlogModel.find();
      res.json(blog);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
})

api.post("/blogs",authentication ,async(req,res)=>{
   try {
      const blog = new BlogModel(req.body);
      await blog.save();
      res.json({ msg: "New Blog Has been Added" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
  
})

api.delete("/blogs/:id",async(req,res)=>{
   try {
      
           const deleted = await BlogModel.findByIdAndDelete(req.params.id)
           res.status(200).send({msg:"Post has been Deleted"})
       
   } catch (error) {
       res.status(400).send({error:error.message})
   }
});

module.exports = { api };










































// api.get("/logout", (req, res) => {
//    const token = req.headers.authorization?.split(" ")[1];
//    try {
//       blackList.push(token);
//       res.status(200).json({ msg: "Logged out Successful" });
//    } catch (error) {
//       res.status(400).json({ err: error.message });
//    }
// });
