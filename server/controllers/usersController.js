const Users = require("../models/users");

class UsersController {

    async findAll(req, res){
        try{
            const users = await Users.find({});
            res.send(users);
        }
        catch(e){
            res.send({e})
        }
    }

async register(req, res){
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

}

module.exports = new UsersController();
