
const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect(process.env.mongoURL)

module.exports={connection}

// API_KEY = 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
// port = 8080
// mongoURL = mongodb+srv://krunalgurao:krunalgurao@digitron.zojf4xp.mongodb.net/Digitron?retryWrites=true&w=majority