const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./src/models/user.models.js");

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./src/middlewares/auth.middleware.js");

app.use(express.json({ limit: "20Kb" }));
app.use(express.urlencoded({ extended: true, limit: "20Kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello from server");
});
// create account route
app.post("/create-user", async (req, res) => {
  // console.log(process.env.ACCESS_TOKEN_SECRET);
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "all fields are required" });
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.status(409).json({
        error: true,
        messgae: "User already exist",
      });
    }

    const user = new User({
      fullName,
      email,
      password,
    });

    const newUser = await User.create(user);
    if (!newUser) {
      return res.status(500).json({
        error: true,
        message: "User not created!!!",
      });
    } else {
      // console.log(process.env.ACCESS_TOKEN_SECRET);
      const accessToken = jwt.sign(
        {
          user,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      return res.status(200).json({
        error: false,
        newUser,
        accessToken,
        message: "User created successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: `Internal server error in creation of user: ${error.message}`,
    });
  }
});
// for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "all fields are required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    return res.status(200).json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(402).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

module.exports = app;
