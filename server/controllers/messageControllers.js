const Message = require("../models/messageModel.js")

exports.sendMessage = async (req, res) => {
  try {
    const { to, from, message } = req.body;
    console.log(to, from, message)
    const newMessage = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (newMessage) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (err) {
    console.log(err.message)
  }
}
