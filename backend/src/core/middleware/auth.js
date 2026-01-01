const jwt = require("jsonwebtoken");
const userModel = require("./../../modules/v1/users/user.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      success: false,
      error: "You Don't Have Access To This Route !!",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await userModel.findById(payload.id);
    if (!user) {
      return res.status(403).json({ success: false, error: "Invalid Token" });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({
        success: false,
        error: "You Don't Have Access To This Route !!",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: error.message || "Something Went Wrong !!",
      });
    }
  }
};

module.exports = auth;
