const bcrypt = require("bcrypt");

const model = require("./user.model");

exports.getAll = async (req, res) => {
  try {
    const users = await model.find();
    return res.json({ success: true, users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Something Went Wrong !!",
    });
  }
};

// exports.create = async (req, res) => {
//   try {
//     const hashedPassword = bcrypt.hashSync(req.body.password, 10);

//     req.body.password = hashedPassword;

//     const user = await model.create(req.body);
//     const userObject = user.toObject();
//     Reflect.deleteProperty(userObject, "password");
//     Reflect.deleteProperty(userObject, "__v");
//     Reflect.deleteProperty(userObject, "boughtBooks");

//     return res.status(201).json({
//       success: true,
//       message: "New user Created Successfully",
//       user: userObject,
//     });
//   } catch (error) {
//     if (error.message.startsWith("E11000")) {
//       return res.status(400).json({
//         success: false,
//         error:
//           "User With this Usernmae or Email or Phone Number is Already Registered !!",
//       });
//     }
//     return res.status(error.status || 500).json({
//       success: false,
//       error: error.message || "Something Went Wrong !!",
//     });
//   }
// };

exports.getOne = async (req, res) => {};

exports.deleteOne = async (req, res) => {};

exports.updateOne = async (req, res) => {};
