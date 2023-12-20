const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    emotion: {
      type: Number,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
