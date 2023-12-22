const express = require("express");
const app = express();
const PORT = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/book-routes");

//* Middlewares
app.use(express.json());
//app.use(cors());
app.use(
  cors({
    origin: "https://tasteless-bianka-david-kim.koyeb.app/",
  })
);
app.use("/books", router);

var whitelist = [
  "https://my-emotion-diary.netlify.app/",
  "http://localhost:9000",
]; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "device-remember-token",
    "Access-Control-Allow-Origin",
    "Origin",
    "Accept",
  ],
};
app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

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
