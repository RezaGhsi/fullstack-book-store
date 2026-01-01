const jwt = require("jsonwebtoken");

const accTokenGen = (identifier) => {
  const token = jwt.sign({ identifier }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });

  return token;
};

const refTokenGen = (identifier) => {
  const token = jwt.sign({ identifier }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return token;
};

module.exports = { accTokenGen, refTokenGen };
