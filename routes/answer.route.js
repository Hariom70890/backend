const express = require("express");
const { ComprehensiveModel } = require("../models/comprehensive.model");
const { CategoryModel } = require("../models/categorize.model");
const { ClozeModel } = require("../models/cloze.model");

const answerRouter = express.Router();
require("dotenv").config();

answerRouter.get("/comprehensive", async (req, res) => {
   try {
      const comp = await ComprehensiveModel.find();
      res.status(200).json(comp);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

answerRouter.get("/", async (req, res) => {
   console.log("first");
   res.send("Hello");
});

answerRouter.get("/category", async (req, res) => {
   try {
      const cate = await CategoryModel.find();
      res.status(200).json(cate);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

answerRouter.get("/cloze", async (req, res) => {
   try {
      const cloze = await ClozeModel.find();
      res.status(200).json(cloze);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});
module.exports = { answerRouter };
