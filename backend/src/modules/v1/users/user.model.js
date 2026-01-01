const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    boughtBooks: {
      type: [mongoose.Types.ObjectId],
      ref: "Book",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "AUTHOR"],
      default: "USER",
    },
  },
  { timestamps: true }
);

schema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
});

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const model = mongoose.model("User", schema);

module.exports = model;
