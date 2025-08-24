const express = require("express");
const app = express();
const port = process.env.port;
const mongoose = require("mongoose");
const User = require("./db");
const cors = require("cors");
require("dotenv").config({
  path: "./secrets/.env",
});

app.use(express.json());
app.use(cors());

async function startApplication() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

app.get("/api", (req, res) => {
  res.send("Hello World");
});

app.post("/api/user", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await User.create(user);
    res.json({
      message: "User created successfully!",
    });
  } catch (error) {
    res.json({
      error: "Error Creating users!",
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.json({
      error: "Error Fetching Users!",
    });
  }
});

startApplication();
