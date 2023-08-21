const mongoose = require("mongoose");
require("dotenv").config();
// connection
const connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };
