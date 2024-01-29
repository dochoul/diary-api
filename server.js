require('dotenv').config();

const express = require("express");
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/diary-routes");

//* Middlewares *//
app.use(express.json());
app.use(cors());
app.use("/api/diary", router);

//* DB Connect *//
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("from get route");
});

app.listen(PORT, () => {
  console.log(`server is running on${PORT}`);
});
