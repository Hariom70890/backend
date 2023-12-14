//authentication :- Identifying the user
// authorization :- What permission do you have , what things you can access.

const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { questionRouter } = require("./routes/question.route");
const { answerRouter } = require("./routes/answer.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/question", questionRouter);


app.use("/answer", answerRouter);

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
