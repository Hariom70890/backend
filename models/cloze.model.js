const mongoose = require("mongoose");

// Schema
const clozeSchema = mongoose.Schema(
   {
    //  text, option, correctans
  
      text: String,
      option: Array,
      answer: String,
   },
   {
      versionKey: false,
   }
);

// Model
const ClozeModel = mongoose.model("cloze", clozeSchema);

module.exports = { ClozeModel };
