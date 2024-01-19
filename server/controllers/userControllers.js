const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const doesExist = await User.findOne({ name: name });
    const passExist = await User.findOne({ email: email });
    if (doesExist) {
      res.json({ msg: "username already exist", stat: 500 });
    } else if (passExist) {
      res.json({ msg: "Email is already registered", stat: 500 });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      newUser.password = ""
      res.status(200).json({ msg: "new user created", stat: 200, usr: newUser });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ msg: "error Registering ", stat: 500 });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const doesUser = await User.findOne({ name: name });
    if (doesUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        doesUser.password
      );
      if (isPasswordCorrect) {
        doesUser.password = "";
        console.log(doesUser)
        res.json({ msg: "login sucessfull", status: 200, usr: doesUser });
        return;
      } else {
        res.json({ msg: "incorrect password", status: 500 });
        return;
      }
    }
    res.json({ msg: "username or password incorrect", status: 500 });
    return;
  } catch (err) {
    console.log(err.message);
    res.json({ msg: "error loggin in", status: 500 });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const { _id } = req.body
    const contacts = await User.find({ _id: { $ne: _id } })
    console.log(_id)
    res.json({ msg: "records of all users", users: contacts })
  } catch (err) {
    console.log(err.message)
  }
}




