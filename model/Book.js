const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  today: {
    type: Date,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  emotion: {
    type: Number,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  contents: {
    type: String,
    require: true,
  },
});

bookSchema.set("timestamps", true);

module.exports = mongoose.model("Book", bookSchema);
