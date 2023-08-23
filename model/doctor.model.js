const mongoose = require("mongoose");

// Schema
const doctorSchema = mongoose.Schema(
   {
      name: String,
      image: String,
      specialization: String,
      experience: Number,
      location: String,
      date: String,
      slots: Number,
      fee: Number,
   },
   {
      versionKey: false,
   }
);

// Model
const doctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { doctorModel };
