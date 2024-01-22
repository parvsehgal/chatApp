const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes")

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", messageRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
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
