const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./src/models/user.models.js");
const Note = require("./src/models/note.model.js");

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
        message: "Email already registered, login with credentials",
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
// get user
app.get("/get-user", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  return res.status(200).json({
    error: false,
    user: isUser,
    message: "User data fetch successfully",
  });
});
// Add Note
app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;

  const { user } = req.user;

  if (!title || !content) {
    return res
      .status(400)
      .json({ error: true, message: "Fields are required!!" });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();
    return res
      .status(200)
      .json({ error: true, note, message: "Note created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: `Server error: ${error}` });
  }
});
//edit note
app.put("/edit-note/noteId", authenticationToken, async (req, res) => {
  const noteId = req.query.id;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  // console.log(noteId);

  const updateFields = {};
  if (title) updateFields.title = title;
  if (content) updateFields.content = content;
  if (tags) updateFields.tags = tags;
  if (isPinned !== undefined) updateFields.isPinned = isPinned;

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json({ error: true, message: `No changes provided` });
  }
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        userId: user._id,
      },
      updateFields,
      { new: true }
    );

    if (!note) {
      console.log(note);
      return res.status(400).json({ error: true, message: `Note not found` });
    }

    return res
      .status(200)
      .json({ error: false, note, message: "Note updated succeefully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: `No change provided` });
  }
});
// get all note
app.get("/get-all-notes", authenticationToken, async (req, res) => {
  const { user } = req.user;
  // console.log(user._id);
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    if (!notes) {
      // console.log(notes);
      return res
        .status(400)
        .json({ error: true, message: "Any note not found for this user" });
    }
    // console.log(notes);
    return res
      .status(200)
      .json({ error: false, notes, message: "Notes fetch successfully" });
  } catch (error) {
    return res.status(500).json({ error: false, message: "Server error" });
  }
});
// delete note
app.delete("/delete-note/noteId", authenticationToken, async (req, res) => {
  const noteId = req.query.id;
  const { user } = req.user;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId: user._id });
    if (!note)
      return res
        .status(400)
        .json({ error: true, message: "Note not found!!!" });
    return res
      .status(200)
      .json({ error: false, note, message: "Note deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, error, message: `Server error: ${error}` });
  }
});
// update isPinned value
app.put(
  "/update-note-isPinned/noteId",
  authenticationToken,
  async (req, res) => {
    const noteId = req.query.id;
    const  {isPinned}  = req.body;
    const { user } = req.user;

    // console.log(noteId);
    try {
      const note = await Note.findByIdAndUpdate(
        {
          _id: noteId,
          userId: user._id,
        },
        {isPinned},
        { new: true }
      );

      if (!note) {
        console.log(note);
        return res.status(400).json({ error: true, message: `Note not found` });
      }

      return res.status(200).json({
        error: false,
        note,
        message: "Note isPinned updated succeefully",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: `Server Error: ${error}` });
    }
  }
);
// search note
app.get("/search-notes/query", authenticationToken, async (req, res) => {
  const { user } = req.user;
  const  query  = req.query.search;
  // console.log(user._id);
  // console.log(query)
  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }
  try {
    const matchNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    }).sort({
      isPinned: -1,
    });
    if (!matchNotes) {
      // console.log(notes);
      return res
        .status(400)
        .json({ error: true, message: "Any note not found for this user" });
    }
    // console.log(notes);
    return res
      .status(200)
      .json({ error: false, matchNotes, message: "Notes fetch successfully related to search query" });
  } catch (error) {
    return res.status(500).json({ error: false, message: "Server error" });
  }
});

module.exports = app;
