import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "express-app");
  res.send("Hey! express");
});

app.get("/fetch", (req, res) => {
  console.log(req.cookies);
  res.send("API Called");
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie('name')
  res.send("Cookie Cleared");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
