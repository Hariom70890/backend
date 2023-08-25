const mongoose = require("mongoose");

// Schema
const userSchema = mongoose.Schema(
   {
      avatar: String,
      name: String,
      email: String,
      password: String,
   },
   {
      versionKey: false,
   }
);

const blogSchema = mongoose.Schema({
   username:String,
   
   title  :String,
   content  :String,
   category :{
       type :String,
       enum:["Business","Tech","Lifestyle","Entertainment"]
   },
   date : {
       type:Date,
       default:Date.now
   },
   like:Number,
   creatorName:String,
   creatorId:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
},{
   versionKey:false
});

// Model
const UserModel1 = mongoose.model("user1", userSchema);
const BlogModel = mongoose.model("blog",blogSchema)
module.exports = { UserModel1,BlogModel };
