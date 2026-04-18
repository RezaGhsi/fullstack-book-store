const model = require("./category.model");

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await model.create({ name });
    return res.status(201).json({ success: true, category });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await model.find();
    return res.json({ success: true, categories });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
