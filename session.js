import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "sample-secret",
    resave: false, // not save again and again save once
    saveUninitialized: false, //prevent empty session to be stored
  }),
);

const users = [];

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    users.push({ username, password });
    res.send("User is registered");
  } else {
    res.send("register first");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    res.send("unAuthorized User");
  } else {
    req.session.user = user;
    res.send("User logged in");
  }
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome ${req.session.user.username}`);
  } else {
    res.send("Unauthorized user");
  }
});

app.get("/visit", (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send(`You visited this page ${req.session.page_views} times`);
  } else {
    req.session.page_views = 1;
    res.send(`Welcome to this page for first time`);
  }
});

app.get("/remove-session", (req, res) => {
  req.session.destroy();
  res.send("Session Removed");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
