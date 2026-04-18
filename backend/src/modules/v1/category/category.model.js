const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// schema.virtual("books", {
//   localField: "_id",
//   foreignField: "categories",
//   ref: "Book",
// });

const model = mongoose.model("Category", schema);

module.exports = model;
