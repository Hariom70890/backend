//authentication :- Identifying the user
// authorization :- What permission do you have , what things you can access.

const express = require("express");
const { connection } = require("./db");
const { api } = require("./routes/api.routes");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/users.routes");
const { doctorRouter } = require("./routes/doctor.routes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", api);

app.use("/doctor", doctorRouter);
app.use("/users", userRouter);

app.listen(process.env.port, async () => {
   try {
      await connection;
      
      console.log(`Server is running at port ${process.env.port}`);
      console.log("Connected to db");
   } catch (error) {
      console.log(error.message);
      console.log("something went wrong!!");
   }
});
