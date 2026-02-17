import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const searchController = (req, res) => {
  let query = req.query.keyword;
  res.status(202).send("Searching Query: " + query);
};

export const usernameController = (req, res) => {
  let username = req.params.username;
  let filepath = path.join(__dirname, "files", "index.html");
  console.log(filepath);
  let html = fs.readFileSync(filepath, "utf-8");
  html = html.replace("{{name}}", username);
  res.status(202).send(html);
};

export const postController = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body is missing");
  }
  const { name, email } = req.body;
  res.json({
    message: `User ${name} with email ${email} account is created successfully`,
  });
};

export const putController = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Body is missing");
  }
  const id = req.params.id;
  const { name, email } = req.body;

  res.json({
    message: `User ${id} updated`,
    data: { name, email },
  });
};

export const multipleParamsController = (req, res) => {
  const { thing, id } = req.params;

  if (!/^[0-9]{5}$/.test(id)) {
    return res.status(400).json({
      message: "ID must be exactly 5 digits",
    });
  }
  res.json({
    message: `Object ${thing} with ${id} received`,
  });
};

export const notfoundController = (req, res)=> {
  let _404html = fs.readFileSync("./files/notfound.html", "utf-8")
  _404html = _404html.replace('{{url}}', req.url)
  res.status(404).send(_404html)
};
