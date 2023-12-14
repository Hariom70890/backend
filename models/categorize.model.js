const mongoose = require("mongoose");

// Schema
const categorySchema = mongoose.Schema(
   {
    // para, questions, option, correctans
    category: String,
    name: String
   },
   {
      versionKey: false,
   }
);


const CategoryModel = mongoose.model("category", categorySchema);

module.exports = { CategoryModel };
