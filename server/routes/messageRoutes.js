const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controllers/messageControllers")

router.post("/sendMessage", sendMessage)
router.post("/getMessages", getMessages)

module.exports = router;
