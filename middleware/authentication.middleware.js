const jwt = require("jsonwebtoken");
// const { BlacklistingModel } = require("../model/blacklist.model");

let authentication = async (req, res, next) => {
   let token = req.headers.authorization.split(" ")[1];
  
   if (token) {
      let decoded = jwt.verify(token, process.env.secretKey1);
      // console.log(decoded)
      if (decoded.userID) {
         req.body.userID = decoded.userID;
         req.body.username = decoded.user
         //  console.log(decoded);
         next();
      } else {
         res.status(400).send({ msg: "Please login !" });
      }
   } else {
      res.status(400).send({ msg: "Please login !" });
   }
};

module.exports = { authentication };
