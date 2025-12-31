const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
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
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

const model = mongoose.model("Book", schema);

module.exports = model;
