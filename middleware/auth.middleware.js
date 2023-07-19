const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.secrate);
      req.body.userID = decoded.userID;
      next();
    } else {
      res.status(201).json({ msg: "not authorised to do this operation" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
