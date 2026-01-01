const userModel = require("./../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const userObject = user.toObject();
    Reflect.deleteProperty(userObject, "password");
    Reflect.deleteProperty(userObject, "__v");
    Reflect.deleteProperty(userObject, "boughtBooks");

    if (req.body.rememberMe) {
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_ACCESS_SECRET
      );

      res.cookie("access_token", `Bearer ${accessToken}`, {
        maxAge: 3600000 * 24 * 15,
        httpOnly: true,
        secure: true,
      });
    }

    return res.status(201).json({
      success: true,
      message: "New user Created Successfully",
      user: userObject,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

exports.logIn = async (req, res) => {};
