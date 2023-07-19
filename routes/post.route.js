const express = require("express");
const PostModel = require("../model/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  const { device1, device2 } = req.query;
  const query = {};
  query.userID = userID;
  if (device1 && device2) {
    query.device = { $and: [{ device: device1 }, { device: device2 }] };
  } else {
    query.device = device1;
  }
  try {
    const Posts = await PostModel.find(query);
    res.status(200).json({ Posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const newpost = await PostModel(req.body);
    await newpost.save();
    res.status(200).json({ msg: "post created successfully", newpost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

postRouter.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
  const { userID } = req.body;
  const post = await PostModel.findOne({ _id: postID });
  if (post) {
    try {
      if (userID === post.userID) {
        const updatedPost = await PostModel.findByIdAndUpdate(
          { _id: postID },
          req.body,
          { new: true }
        );
        res.status(200).json({ msg: "post updated", updatedPost });
      } else {
        res.status(201).json({ msg: "not authorised to do this operation" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).json({ msg: `post not found...!!` });
  }
});

postRouter.delete("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
  const { userID } = req.body;
  const post = await PostModel.findOne({ _id: postID });
  if (post) {
    try {
      if (userID === post.userID) {
        const deletedPost = await PostModel.findByIdAndDelete({ _id: postID });
        res.status(200).json({ msg: "post deleted", deletedPost });
      } else {
        res.status(201).json({ msg: "not authorised to do this operation" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(404).json({ msg: `post not found...!!` });
  }
});

module.exports = postRouter;
