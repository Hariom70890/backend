const mongoose = require("mongoose");

// Schema
const comprehensiveSchema = mongoose.Schema(
   {
      // para, questions, option, correctans
      para: String,
      questions: String,
      option: Array,
      correctans: String,
   },
   {
      versionKey: false,
   }
);

// Model
const ComprehensiveModel = mongoose.model("comprehensive", comprehensiveSchema);

module.exports = { ComprehensiveModel };
