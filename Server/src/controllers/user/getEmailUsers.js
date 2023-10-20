const { User } = require("../db");

const userEmail = async (email) => {
  const userFound = await User.findOne({ where: { email: email } });
  if (!userFound) throw new Error("Email not found");
  return userFound;
};
module.exports = userEmail;