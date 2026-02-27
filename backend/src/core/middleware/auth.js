const jwt = require("jsonwebtoken");
const userModel = require("./../../modules/v1/users/user.model");

const auth = async (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(403).json({
      success: false,
      error: "You Don't Have Access To This Route !!",
    });
  }

  try {
    const accessTokenPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
    );

    const user = await userModel.findOne({
      $or: [
        { email: accessTokenPayload.identifier },
        { username: accessTokenPayload.identifier },
      ],
    });

    if (!user) {
      return res.status(403).json({ success: false, error: "Invalid Token" });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        error: error.message,
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
