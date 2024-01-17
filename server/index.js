const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors());
app.use(express.json());
//app.use("/api/v1", testRoute);
mongoose
  .connect("mongodb://127.0.0.1:27017/userdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connection is sucessfull");
  })
  .catch(() => {
    console.log("error");
  });

const server = app.listen(process.env.PORT, () => {
  console.log("server instantiated on port", process.env.PORT);
});
