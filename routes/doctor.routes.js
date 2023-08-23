const express = require("express");
const { doctorModel } = require("../Model/doctor.model");

const doctorRouter = express.Router();

doctorRouter.post("/appointment", async (req, res) => {
   console.log(req.body);
   try {
      const doctor = new doctorModel(req.body);
      await doctor.save();
      res.json({ msg: "New doctor Has been Added" });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

doctorRouter.get("/", async (req, res) => {
   try {
      const doctors = await doctorModel.find({ userID: req.body.userID });
      res.json(doctors);
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

doctorRouter.get("/filter/:specialization", async (req, res) => {
   const { specialization } = req.params;

   try {
      const filteredDoctors = await doctorModel.find({ specialization });
      res.json(filteredDoctors);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

doctorRouter.get("/sort", async (req, res) => {
   try {
      const sortedDoctors = await doctorModel.find().sort({ postedDate: 1 });
      res.json(sortedDoctors);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

doctorRouter.get("/search/:name", async (req, res) => {
   const { name } = req.params;

   try {
      const matchingDoctors = await doctorModel.find({
         name: { $regex: name, $options: "i" },
      });
      res.json(matchingDoctors);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

doctorRouter.patch("/update/:doctorID", async (req, res) => {
   // userID in the user docs == userID in the note docs
   const userIDinUserDoc = req.body.userID;
   const { doctorID } = req.params;
   try {
      const doctor = await doctorModel.findOne({ _id: doctorID });
      const userIDindoctorDocs = note.userID;
      if (userIDinUserDoc == userIDindoctorDocs) {
         await doctorModel.findByIdAndUpdate({ _id: doctorID }, req.body);
         res.json({ msg: `${doctor.name} has been updated` });
      } else {
         res.json({ msg: "Not Authorized !!" });
      }
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

doctorRouter.delete("/:id", async (req, res) => {
   // userID in the user docs == userID in the note docs
   // const userIDinUserDoc = req.body.userID;
   const { ID } = req.params;
   // console.log(doctorID)
   try {
      const deletedData = await doctorModel.findByIdAndDelete(ID);
      res.status(400).send({ msg: "Data Deleted", deletedData });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
});

module.exports = { doctorRouter };
