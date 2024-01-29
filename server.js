const express = require("express");
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/book-routes");

//* Middlewares *//
app.use(express.json());
app.use(cors());
app.use("/books", router);

//* DB Connect *//
mongoose
  .connect(
    "mongodb+srv://admin:1234@cluster0.4ffeuqe.mongodb.net/bookStore?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.send("from get route");
});

app.listen(PORT, () => {
  console.log(`server is running on${PORT}`);
});
