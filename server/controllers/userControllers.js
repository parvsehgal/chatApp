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
      res.status(200).json({ msg: "new user created", stat: 200 });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ msg: "error Registering ", stat: 500 });
  }
};
