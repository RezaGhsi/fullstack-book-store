const { isValidObjectId } = require("mongoose");
const model = require("./book.model");

exports.getAll = async (req, res) => {
  try {
    const books = await model.find();
    return res.json({ success: true, books: books });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const isAlreadyInDb = await model.findOne({ name: req.body.name });
    if (isAlreadyInDb) {
      return res.status(400).json({
        success: false,
        error: "Book With this Name is Already Created !!",
      });
    }

    const book = await model.create(req.body);

    return res
      .status(201)
      .json({ success: true, message: "New Book Created Successfully", book });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.getOne = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ success: false, error: "ID is Not Valid !!" });
  }

  try {
    const book = await model
      .findById(req.params.id)
      .populate("category")
      .populate("author");

    if (!book) {
      return res
        .status(404)
        .json({ success: false, error: "Book Not Found !!" });
    }

    return res.json({ success: true, book });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.deleteOne = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(400)
      .json({ success: false, error: "ID is Not Valid !!" });
  }

  try {
    const book = await model.findByIdAndDelete(req.params.id);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, error: "Book Not Found !!" });
    }

    return res.json({ success: true, message: "Book Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.search = async (req, res) => {
  const searchTerm = req.params.term;
  console.log(searchTerm);
  if (searchTerm.length <= 2) {
    return res.status(400).json({
      success: false,
      error: "Search Length has to be Grater than 2 !!",
    });
  }

  try {
    const books = await model.find({
      name: { $regex: searchTerm, $options: "i" },
    });

    return res.json({ success: true, books });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};
