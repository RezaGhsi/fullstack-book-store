const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descreption: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Author",
    },
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: "Publisher",
    },
    categories: {
      type: [mongoose.Types.ObjectId],
      ref: "Category",
    },
  },
  { timestamps: true },
);

const model = mongoose.model("Book", schema);

module.exports = model;
