const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  getAllContacts
} = require("../controllers/userControllers");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/allContacts", getAllContacts);


module.exports = router;
