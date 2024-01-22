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

exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    console.log(err.message)
  }
}
