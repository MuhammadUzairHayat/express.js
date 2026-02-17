import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(express.json());
const users = [];
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (username && password) {
    users.push({
      username,
      password: hashedPassword,
    });
    res.send("User is registered");
  } else {
    res.send("register first");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.send("unAuthorized User");
  } else {
    const token = jwt.sign({ username }, "test#secret");
    res.json({token});
  }
});

app.get("/dashboard", (req, res) => {
  const token = req.header('Authorization')
  const decodedToken = jwt.verify(token, 'test#secret')
  if (decodedToken.username) {
    res.send(`Welcome ${decodedToken.username}`);
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

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
