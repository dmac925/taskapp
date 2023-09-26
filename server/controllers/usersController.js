const Users = require("../models/users");

const register = async (req, res) => {
  try {
    const { email, password, admin } = req.body;
    const newUser = await Users.create({
      email,
      password,
      admin: admin || false,
    });
    res.send(newUser);
  } catch (error) {
    res.send({ error });
    console.log("error ===>", error);
  }
};

module.exports = {
  register,
};