const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
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
    createdAt: {
      type: String,
      default: function () {
        return moment
          .tz(new Date(), "Asia/Seoul")
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
    updatedAt: {
      type: String,
      default: function () {
        return moment
          .tz(new Date(), "Asia/Seoul")
          .format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
