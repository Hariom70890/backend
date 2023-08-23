const jwt = require("jsonwebtoken");
const { blackList } = require("../blackList");
require("dotenv").config();

const auth = (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1];
   if (token) {
      if (blackList.includes(token)) {
         res.json({ msg: "Please Login again !!" });
      }
      try {
         // verify a token symmetric
         const decoded = jwt.verify(token, process.env.secretKey);
         if (decoded) {
            // console.log(decoded)
            req.body.userID = decoded.userID;
            req.body.user = decoded.user;
            // console.log(req.body)
            next();
         } else {
            res.status(200).json({ msg: "Token not recognised" });
         }
      } catch (error) {
         res.status(400).json({ error: error.message });
      }
   } else {
      res.status(400).json({ msg: "Please Login !!" });
   }
};

module.exports = {
   auth,
};
