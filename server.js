import express from "express";
import connectDB from "./config/db.js";
import { Person } from "./models/Person.js";

const app = express();
const PORT = 3000;
await connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey! Express");
});

// Adding data
app.post("/person", async (req, res) => {
  try {
    const { name, email, age } = req.body;
  const newPerson = new Person({ name, email, age });
  await newPerson.save();
  console.log(newPerson);
  res.send("Person Added");
  } catch (error) {
    res.status(404).send(error.message)
  }
});

// Updating data
app.put("/person", async (req, res) => {
  const { email } = req.body;
  //   const personData = await Person.findByIdAndUpdate(id, { email: "newmail@email.com" });   // in one line
  const personData = await Person.findOne({ email });

  if (personData) {
    console.log(personData);
    personData.name = "Muhammad Uzair";
    personData.email = "uzair@email.com";
    personData.age = 21;
    await personData.save();
    res.send("Person Data Updated");
  } else {
    res.send(`Person with email ${email} not found.`);
  }
});

app.delete("/person/:id", async (req, res) => {
  const personId = req.params.id;
  await Person.findByIdAndDelete(personId);
  res.send("Person Deleted");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
