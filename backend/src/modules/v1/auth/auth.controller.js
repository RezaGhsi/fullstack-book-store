const userModel = require("./../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { accTokenGen, refTokenGen } = require("../../../core/utils/auth");
const { MongooseError } = require("mongoose");
const app = require("express")();

exports.signUp = async (req, res) => {
  try {
    const { username, email, phone } = req.body;

    const isUserSignedUp = await userModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (isUserSignedUp) {
      return res.status(400).json({
        success: false,
        error: "User is Already Registered !!",
      });
    }

    const user = await userModel.create(req.body);
    // const userObject = user.toObject();
    // Reflect.deleteProperty(userObject, "password");
    // Reflect.deleteProperty(userObject, "__v");
    // Reflect.deleteProperty(userObject, "boughtBooks");

    const accessToken = accTokenGen(user.email);

    return res.status(201).json({
      success: true,
      message: "New user Created Successfully",
      accessToken,
      // user: userObject,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.logIn = async (req, res) => {
  const { identifier, password } = req.body;
  const re = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
  const isEmail = identifier.match(re);

  try {
    const user = isEmail
      ? await userModel.findOne({ email: identifier })
      : await userModel.findOne({ username: identifier });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Wrong (Email | Username) or Password !!",
      });
    }

    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        error: "Wrong (Email | Username) or Password !!",
      });
    }

    const accessToken = accTokenGen(identifier);
    const refreshToken = refTokenGen(identifier);

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    res.cookie("access_token", accessToken, {
      maxAge: 60000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refresh_token", refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ success: true, message: "Logged In Successfully", accessToken });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    const refreshToken = req.cookie?.["refresh_token"];

    if (!refreshToken) {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res.status(204).end();
    }
    await userModel.updateOne(
      { refreshToken },
      { $unset: { refreshToken: "" } },
    );

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(204);
  } catch (error) {
    console.error("Log Out Error: ", error);

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(204);
  }
};

exports.getAccessToken = async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, error: "No Token Provided !!" });
  }

  try {
    const user = await userModel.findOne({ refreshToken });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, error: "No User Found !!" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newRefreshToken = refTokenGen(user.email);
    const accessToken = accTokenGen(user.email);

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("access_token", accessToken, {
      maxAge: 60000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refresh_token", newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.json({ success: true, accessToken });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, error: error.message });
    } else if (error instanceof MongooseError) {
      console.error(error);
      return res
        .status(error.status || 500)
        .json({ success: false, error: error.message });
    } else {
      return res.status(error.status || 500).json({
        success: false,
        error: error.message || "Something Went Wrong !!",
      });
    }
  }
};

exports.getMe = async (req, res) => {
  return res.json({ user: req.user });
};
