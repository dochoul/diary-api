const express = require("express");
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/book-routes");

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: "https://tasteless-bianka-david-kim.koyeb.app",
  credentials: true,
};

//* Middlewares
app.use(express.json());
//app.use(cors());
app.use(cors(corsOptions));
app.use("/books", router);

//* DB Connect
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
  res.send("from get route");
});

app.listen(PORT, () => {
  console.log(`server is running on${PORT}`);
});

//* User Schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     require: true,
//   },
// });
// const User = mongoose.model("User", userSchema);

// app.post("/createuser", async (req, res) => {
//   try {
//     const bodyData = req.body;
//     const user = new User(bodyData);
//     const userData = await user.save();
//     res.send(userData);
//     console.log("ok?");
//   } catch (error) {
//     res.send(error);
//   }
// });
