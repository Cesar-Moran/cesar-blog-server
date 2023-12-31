const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const login = async (req, res) => {
  const { password } = req.body;

  const secretPassword = process.env.SECRET_PASSWORD;

  if (!password || password !== secretPassword) {
    console.log("Invalid password");
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign({}, jwtSecret);

  console.log(token);
  res.json(token);
};

module.exports = login;
